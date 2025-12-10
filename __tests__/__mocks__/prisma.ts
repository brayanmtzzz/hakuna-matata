import { vi } from 'vitest';

// Mock de datos de servicios
export const mockServices = [
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

// Mock del cliente de Prisma
export const prismaMock = {
  service: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  user: {
    findUnique: vi.fn(),
    create: vi.fn(),
  },
};

// Mock del módulo de Prisma
vi.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}));

export default prismaMock;
