import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';

// Mock de datos de servicios
const mockServices = [
  {
    id: '1',
    title: 'Consulta General',
    description: 'Revisión completa del estado de salud de tu mascota',
    img: 'https://example.com/consulta.jpg',
    is_active: true,
    createdAt: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    id: '2',
    title: 'Vacunación',
    description: 'Protege a tu mascota con nuestro plan de vacunación',
    img: 'https://example.com/vacuna.jpg',
    is_active: true,
    createdAt: new Date('2024-01-02'),
    updated_at: new Date('2024-01-02'),
  },
  {
    id: '3',
    title: 'Cirugía',
    description: 'Intervenciones quirúrgicas con equipo especializado',
    img: null,
    is_active: false,
    createdAt: new Date('2024-01-03'),
    updated_at: new Date('2024-01-03'),
  },
];

// Mock de Prisma
const prismaMock = {
  service: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
};

// Mock del módulo de prisma ANTES de importar las rutas
vi.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}));

// Ahora importar las rutas después de mockear
const { GET: getServices, POST: createService } = await import('@/app/api/services/route');
const {
  GET: getServiceById,
  PUT: updateService,
  DELETE: deleteService
} = await import('@/app/api/services/[id]/route');

describe('API Routes - /api/services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/services', () => {
    it('debe retornar un array de servicios exitosamente', async () => {
      prismaMock.service.findMany.mockResolvedValue(mockServices);

      const response = await getServices();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data).toHaveLength(3);
      expect(prismaMock.service.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'asc' },
      });
    });

    it('debe retornar un array vacío cuando no hay servicios', async () => {
      prismaMock.service.findMany.mockResolvedValue([]);

      const response = await getServices();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual([]);
    });

    it('debe manejar errores de base de datos con status 500', async () => {
      prismaMock.service.findMany.mockRejectedValue(new Error('Database error'));

      const response = await getServices();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toHaveProperty('error');
      expect(data.error).toBe('Error al obtener servicios');
    });
  });

  describe('POST /api/services', () => {
    it('debe crear un servicio con datos válidos', async () => {
      const newService = {
        title: 'Desparasitación',
        description: 'Tratamiento antiparasitario completo',
        img: 'https://example.com/desparasitacion.jpg',
        is_active: true,
      };

      const createdService = {
        id: '4',
        ...newService,
        createdAt: new Date(),
        updated_at: new Date(),
      };

      prismaMock.service.create.mockResolvedValue(createdService);

      const request = new NextRequest('http://localhost/api/services', {
        method: 'POST',
        body: JSON.stringify(newService),
      });

      const response = await createService(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('id');
      expect(data.title).toBe(newService.title);
      expect(prismaMock.service.create).toHaveBeenCalledWith({
        data: {
          title: newService.title,
          description: newService.description,
          img: newService.img,
          is_active: newService.is_active,
        },
      });
    });

    it('debe establecer is_active=true por defecto si no se proporciona', async () => {
      const newService = {
        title: 'Limpieza Dental',
        description: 'Limpieza profesional de dientes',
        img: null,
      };

      const createdService = {
        id: '5',
        ...newService,
        is_active: true,
        createdAt: new Date(),
        updated_at: new Date(),
      };

      prismaMock.service.create.mockResolvedValue(createdService);

      const request = new NextRequest('http://localhost/api/services', {
        method: 'POST',
        body: JSON.stringify(newService),
      });

      const response = await createService(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(prismaMock.service.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          is_active: true,
        }),
      });
    });

    it('debe manejar errores al crear servicio', async () => {
      prismaMock.service.create.mockRejectedValue(new Error('Unique constraint failed'));

      const request = new Request('http://localhost/api/services', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Consulta General',
          description: 'Duplicado',
        }),
      });

      const response = await createService(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toHaveProperty('error');
      expect(data.error).toBe('Error al crear servicio');
    });
  });
});

describe('API Routes - /api/services/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/services/[id]', () => {
    it('debe retornar un servicio existente', async () => {
      const serviceId = '1';
      prismaMock.service.findUnique.mockResolvedValue(mockServices[0]);

      const request = new NextRequest(`http://localhost/api/services/${serviceId}`);
      const context = { params: Promise.resolve({ id: serviceId }) };

      const response = await getServiceById(request, context);
      const data = await response.json();

      expect(response.status).toBe(200);
      // JSON serializa las fechas a strings, así que comparamos con objectContaining
      expect(data).toMatchObject({
        id: mockServices[0].id,
        title: mockServices[0].title,
        description: mockServices[0].description,
        img: mockServices[0].img,
        is_active: mockServices[0].is_active,
      });
      expect(prismaMock.service.findUnique).toHaveBeenCalledWith({
        where: { id: serviceId },
      });
    });

    it('debe retornar 404 para servicio inexistente', async () => {
      prismaMock.service.findUnique.mockResolvedValue(null);

      const request = new NextRequest('http://localhost/api/services/999');
      const context = { params: Promise.resolve({ id: '999' }) };

      const response = await getServiceById(request, context);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data).toHaveProperty('error');
      expect(data.error).toBe('Servicio no encontrado');
    });

    it('debe manejar errores de base de datos', async () => {
      prismaMock.service.findUnique.mockRejectedValue(new Error('Database error'));

      const request = new NextRequest('http://localhost/api/services/1');
      const context = { params: Promise.resolve({ id: '1' }) };

      const response = await getServiceById(request, context);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toHaveProperty('error');
    });
  });

  describe('PUT /api/services/[id]', () => {
    it('debe actualizar un servicio existente', async () => {
      const serviceId = '1';
      const updateData = {
        title: 'Consulta General Actualizada',
        description: 'Nueva descripción',
        img: 'https://example.com/new.jpg',
        is_active: false,
      };

      const updatedService = {
        id: serviceId,
        ...updateData,
        createdAt: new Date(),
        updated_at: new Date(),
      };

      prismaMock.service.update.mockResolvedValue(updatedService);

      const request = new NextRequest(`http://localhost/api/services/${serviceId}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
      });
      const context = { params: Promise.resolve({ id: serviceId }) };

      const response = await updateService(request, context);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.title).toBe(updateData.title);
      expect(prismaMock.service.update).toHaveBeenCalledWith({
        where: { id: serviceId },
        data: updateData,
      });
    });

    it('debe actualizar campos parcialmente', async () => {
      const serviceId = '2';
      const partialUpdate = {
        is_active: false,
      };

      const updatedService = {
        ...mockServices[1],
        is_active: false,
      };

      prismaMock.service.update.mockResolvedValue(updatedService);

      const request = new NextRequest(`http://localhost/api/services/${serviceId}`, {
        method: 'PUT',
        body: JSON.stringify(partialUpdate),
      });
      const context = { params: Promise.resolve({ id: serviceId }) };

      const response = await updateService(request, context);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.is_active).toBe(false);
    });

    it('debe manejar errores al actualizar', async () => {
      prismaMock.service.update.mockRejectedValue(new Error('Record not found'));

      const request = new NextRequest('http://localhost/api/services/999', {
        method: 'PUT',
        body: JSON.stringify({ title: 'Test' }),
      });
      const context = { params: Promise.resolve({ id: '999' }) };

      const response = await updateService(request, context);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toHaveProperty('error');
    });
  });

  describe('DELETE /api/services/[id]', () => {
    it('debe eliminar un servicio existente', async () => {
      const serviceId = '1';
      prismaMock.service.delete.mockResolvedValue(mockServices[0]);

      const request = new NextRequest(`http://localhost/api/services/${serviceId}`, {
        method: 'DELETE',
      });
      const context = { params: Promise.resolve({ id: serviceId }) };

      const response = await deleteService(request, context);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('message');
      expect(data.message).toBe('Servicio eliminado');
      expect(prismaMock.service.delete).toHaveBeenCalledWith({
        where: { id: serviceId },
      });
    });

    it('debe manejar errores al eliminar servicio inexistente', async () => {
      prismaMock.service.delete.mockRejectedValue(new Error('Record not found'));

      const request = new NextRequest('http://localhost/api/services/999', {
        method: 'DELETE',
      });
      const context = { params: Promise.resolve({ id: '999' }) };

      const response = await deleteService(request, context);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toHaveProperty('error');
      expect(data.error).toBe('Error al eliminar servicio');
    });
  });
});
