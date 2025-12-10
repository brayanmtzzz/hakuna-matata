import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Services from '@/components/Services';

// Mock global fetch
global.fetch = vi.fn();

describe('Componente Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockServicesData = [
    {
      id: '1',
      title: 'Consulta General',
      description: 'Revisión completa del estado de salud de tu mascota',
      img: 'https://example.com/consulta.jpg',
      is_active: true,
    },
    {
      id: '2',
      title: 'Vacunación',
      description: 'Protege a tu mascota con nuestro plan de vacunación',
      img: 'https://example.com/vacuna.jpg',
      is_active: true,
    },
    {
      id: '3',
      title: 'Cirugía',
      description: 'Intervenciones quirúrgicas con equipo especializado',
      img: null,
      is_active: false, // Este no debería mostrarse
    },
  ];

  describe('Renderizado y Estados', () => {
    it('debe mostrar skeleton loader mientras carga', () => {
      (global.fetch as any).mockImplementation(() =>
        new Promise(() => {}) // Never resolves
      );

      render(<Services />);

      // El componente muestra 6 skeleton loaders
      const skeletons = document.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it('debe renderizar la lista de servicios activos', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockServicesData,
      });

      render(<Services />);

      await waitFor(() => {
        expect(screen.getByText('Consulta General')).toBeInTheDocument();
        expect(screen.getByText('Vacunación')).toBeInTheDocument();
      });
    });

    it('NO debe mostrar servicios inactivos', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockServicesData,
      });

      render(<Services />);

      await waitFor(() => {
        expect(screen.getByText('Consulta General')).toBeInTheDocument();
      });

      // El servicio "Cirugía" está inactivo y no debe mostrarse
      expect(screen.queryByText('Cirugía')).not.toBeInTheDocument();
    });

    it('debe mostrar el título de la sección correctamente', () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      render(<Services />);

      // Buscar por el texto completo para evitar duplicados
      expect(screen.getByText('Nuestros')).toBeInTheDocument();
      expect(screen.getByText('Servicios Profesionales')).toBeInTheDocument();
    });

    it('debe renderizar correctamente cuando no hay servicios', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      render(<Services />);

      await waitFor(() => {
        expect(screen.queryByText('Consulta General')).not.toBeInTheDocument();
      });
    });
  });

  describe('Interacciones y Enlaces', () => {
    it('debe tener enlaces "Agendar Ahora" que apunten a #cita', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockServicesData,
      });

      render(<Services />);

      await waitFor(() => {
        const agendarLinks = screen.getAllByText('Agendar Ahora');
        expect(agendarLinks.length).toBeGreaterThan(0);
        agendarLinks.forEach(link => {
          expect(link.closest('a')).toHaveAttribute('href', '#cita');
        });
      });
    });

    it('debe tener enlace de WhatsApp con URL correcta', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockServicesData,
      });

      render(<Services />);

      await waitFor(() => {
        const whatsappLink = screen.getByText('Contáctanos por WhatsApp').closest('a');
        expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/529242105259');
        expect(whatsappLink).toHaveAttribute('target', '_blank');
        expect(whatsappLink).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe('Manejo de Imágenes', () => {
    it('debe renderizar imágenes cuando están disponibles', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockServicesData.filter(s => s.is_active),
      });

      render(<Services />);

      await waitFor(() => {
        const images = screen.getAllByRole('img');
        // Verificar que hay imágenes renderizadas
        expect(images.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Manejo de Errores', () => {
    it('debe manejar errores de fetch gracefully', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

      render(<Services />);

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalled();
      });

      consoleErrorSpy.mockRestore();
    });

    it('debe completar el estado de loading incluso con error', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});

      (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

      render(<Services />);

      await waitFor(() => {
        // Verificar que los skeletons ya no están
        const skeletons = document.querySelectorAll('.animate-pulse');
        expect(skeletons.length).toBe(0);
      });
    });
  });

  describe('Contenido de las Tarjetas', () => {
    it('debe mostrar título y descripción de cada servicio', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockServicesData,
      });

      render(<Services />);

      await waitFor(() => {
        expect(screen.getByText('Consulta General')).toBeInTheDocument();
        expect(screen.getByText(/Revisión completa del estado de salud/i)).toBeInTheDocument();
        expect(screen.getByText('Vacunación')).toBeInTheDocument();
        expect(screen.getByText(/Protege a tu mascota con nuestro plan/i)).toBeInTheDocument();
      });
    });
  });

  describe('Animaciones y UX', () => {
    it('debe tener la sección con el id correcto para navegación', () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      render(<Services />);

      const section = document.querySelector('#servicios');
      expect(section).toBeInTheDocument();
    });

    it('debe mostrar el badge de "Servicios Profesionales"', () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      render(<Services />);

      expect(screen.getByText('Servicios Profesionales')).toBeInTheDocument();
    });

    it('debe mostrar la CTA de contacto', () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      render(<Services />);

      expect(screen.getByText(/¿Tienes dudas sobre nuestros servicios?/i)).toBeInTheDocument();
    });
  });
});
