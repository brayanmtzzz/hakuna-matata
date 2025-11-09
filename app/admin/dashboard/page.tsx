'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Service {
  id: string;
  title: string;
  description: string;
  img: string | null;
  is_active: boolean;
  updated_at: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    img: '',
    is_active: true,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchServices();
    }
  }, [status]);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingService) {
        // Update
        await fetch(`/api/services/${editingService.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        // Create
        await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      
      setShowModal(false);
      setEditingService(null);
      setFormData({ title: '', description: '', img: '', is_active: true });
      fetchServices();
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      img: service.img || '',
      is_active: service.is_active,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este servicio?')) return;
    
    try {
      await fetch(`/api/services/${id}`, { method: 'DELETE' });
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleOpenModal = () => {
    setEditingService(null);
    setFormData({ title: '', description: '', img: '', is_active: true });
    setShowModal(true);
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl text-gray-600">Cargando...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/img/logo/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Panel Administrativo
                </h1>
                <p className="text-sm text-gray-600">
                  Bienvenido, {session?.user?.name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/"
                target="_blank"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Ver sitio →
              </a>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-all"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Gestión de Servicios
          </h2>
          <button
            onClick={handleOpenModal}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg"
          >
            + Nuevo Servicio
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                {service.img ? (
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
                    <span className="text-6xl">🐾</span>
                  </div>
                )}
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                    service.is_active
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}
                >
                  {service.is_active ? 'Activo' : 'Inactivo'}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {service.description}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-all"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {editingService ? 'Editar Servicio' : 'Nuevo Servicio'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Nombre del servicio"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Descripción *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Describe el servicio..."
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  URL de la Imagen
                </label>
                <input
                  type="text"
                  value={formData.img}
                  onChange={(e) =>
                    setFormData({ ...formData, img: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="/img/servicios/imagen.jpg"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Coloca la imagen en /public/img/servicios/ y usa la ruta relativa
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) =>
                    setFormData({ ...formData, is_active: e.target.checked })
                  }
                  className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="is_active" className="text-gray-700 font-semibold">
                  Servicio Activo
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingService(null);
                  }}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-all"
                >
                  {editingService ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
