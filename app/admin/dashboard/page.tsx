'use client';

import { useEffect, useState, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Lottie from 'lottie-react';
import animalCareLoading from '@/public/img/lottie/Animal care Loading.json';

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
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    serviceId: string | null;
    serviceName: string;
  }>({ show: false, serviceId: null, serviceName: '' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      showNotification('Tipo de archivo no válido. Use JPEG, PNG, WEBP o GIF', 'error');
      return;
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      showNotification('El archivo es demasiado grande. Tamaño máximo: 5MB', 'error');
      return;
    }

    setSelectedFile(file);

    // Crear preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!selectedFile) return formData.img || null;

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', selectedFile);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al subir imagen');
      }

      return data.path;
    } catch (error) {
      console.error('Error uploading image:', error);
      showNotification('Error al subir la imagen', 'error');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);

    try {
      // Si hay un archivo seleccionado, subirlo primero
      let imagePath = formData.img;
      if (selectedFile) {
        const uploadedPath = await uploadImage();
        if (!uploadedPath) {
          setSaveLoading(false);
          return;
        }
        imagePath = uploadedPath;
      }

      const serviceData = {
        ...formData,
        img: imagePath,
      };

      if (editingService) {
        // Update
        const response = await fetch(`/api/services/${editingService.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(serviceData),
        });

        if (!response.ok) throw new Error('Error al actualizar servicio');
        showNotification('Servicio actualizado exitosamente', 'success');
      } else {
        // Create
        const response = await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(serviceData),
        });

        if (!response.ok) throw new Error('Error al crear servicio');
        showNotification('Servicio creado exitosamente', 'success');
      }

      setShowModal(false);
      setEditingService(null);
      setFormData({ title: '', description: '', img: '', is_active: true });
      setSelectedFile(null);
      setImagePreview(null);
      fetchServices();
    } catch (error) {
      console.error('Error saving service:', error);
      showNotification('Error al guardar el servicio', 'error');
    } finally {
      setSaveLoading(false);
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
    setImagePreview(service.img);
    setSelectedFile(null);
    setShowModal(true);
  };

  const handleDelete = (service: Service) => {
    setDeleteConfirm({
      show: true,
      serviceId: service.id,
      serviceName: service.title
    });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.serviceId) return;

    try {
      const response = await fetch(`/api/services/${deleteConfirm.serviceId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error al eliminar servicio');

      showNotification('Servicio eliminado exitosamente', 'success');
      setDeleteConfirm({ show: false, serviceId: null, serviceName: '' });
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      showNotification('Error al eliminar el servicio', 'error');
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, serviceId: null, serviceName: '' });
  };

  const handleOpenModal = () => {
    setEditingService(null);
    setFormData({ title: '', description: '', img: '', is_active: true });
    setImagePreview(null);
    setSelectedFile(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingService(null);
    setFormData({ title: '', description: '', img: '', is_active: true });
    setImagePreview(null);
    setSelectedFile(null);
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F9F9] to-[#D5DBDB]">
        <div className="flex flex-col items-center">
          <Lottie
            animationData={animalCareLoading}
            loop={true}
            className="w-64 h-64"
          />
          <p className="text-xl text-gray-600 font-semibold mt-4">Cargando...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9F9] via-white to-[#D5DBDB]">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-1/2 z-50 max-w-md w-full px-4"
          >
            <div className={`rounded-xl shadow-2xl p-4 flex items-center gap-3 ${
              notification.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}>
              {notification.type === 'success' ? (
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <p className="font-semibold">{notification.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-gradient-to-r from-[#154360] via-[#5A9FBF] to-[#7FB3D5] shadow-2xl border-b-4 border-[#A9DFBF]">
        <div className="container mx-auto px-4 py-4">
          {/* Mobile Header */}
          <div className="flex md:hidden items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="relative w-20 h-14 bg-white rounded-2xl p-2 shadow-lg">
                <Image
                  src="/img/logo/Logo.png"
                  alt="Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white drop-shadow-lg">
                  Panel Admin
                </h1>
              </div>
            </motion.div>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 hover:bg-white/20 rounded-lg transition-all"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 space-y-2 overflow-hidden"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-2">
                  <p className="text-xs text-white/70">Sesión iniciada como</p>
                  <p className="text-sm font-semibold text-white">{session?.user?.name}</p>
                </div>
                <a
                  href="/"
                  target="_blank"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-3 rounded-lg transition-all font-semibold border border-white/30 w-full"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Ver Sitio Web</span>
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: '/' });
                  }}
                  className="flex items-center gap-3 bg-red-500/90 hover:bg-red-600 text-white px-4 py-3 rounded-lg transition-all font-semibold w-full"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Cerrar Sesión</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="relative w-24 h-16 bg-white rounded-2xl p-2 shadow-lg">
                <Image
                  src="/img/logo/Logo.png"
                  alt="Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                  Panel de Control
                </h1>
                <p className="text-sm text-white/90 font-medium">
                  ¡Hola de nuevo, {session?.user?.name}!
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <a
                href="/"
                target="_blank"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl transition-all font-semibold flex items-center gap-2 hover:scale-105 shadow-lg border border-white/30"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Ver Sitio</span>
              </a>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-red-500/90 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl transition-all font-semibold flex items-center gap-2 hover:scale-105 shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Salir</span>
              </button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Header con estadísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#154360] mb-2">
                  Gestión de Servicios
                </h2>
                <p className="text-gray-600 text-base sm:text-lg">
                  Administra los servicios que se muestran en tu sitio web
                </p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs sm:text-sm text-gray-600">
                      {services.filter(s => s.is_active).length} Activos
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gray-500"></div>
                    <span className="text-xs sm:text-sm text-gray-600">
                      {services.filter(s => !s.is_active).length} Inactivos
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#7FB3D5]"></div>
                    <span className="text-xs sm:text-sm text-gray-600 font-semibold">
                      {services.length} Total
                    </span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenModal}
                className="bg-gradient-to-r from-[#5A9FBF] via-[#7FB3D5] to-[#A9DFBF] hover:from-[#154360] hover:via-[#5A9FBF] hover:to-[#7FB3D5] text-white px-4 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 sm:gap-3 w-full lg:w-auto justify-center"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="whitespace-nowrap">Agregar Servicio</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        {services.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center border-2 border-dashed border-gray-300"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#7FB3D5] to-[#A9DFBF] rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-3">No hay servicios aún</h3>
              <p className="text-gray-600 text-lg mb-8">Comienza agregando tu primer servicio para mostrar en el sitio web</p>
              <button
                onClick={handleOpenModal}
                className="bg-gradient-to-r from-[#5A9FBF] to-[#7FB3D5] hover:from-[#154360] hover:to-[#5A9FBF] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-xl inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Agregar Primer Servicio
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all"
              >
                <div className="relative h-56 bg-gradient-to-br from-[#7FB3D5] to-[#A9DFBF]">
                  {service.img ? (
                    <Image
                      src={service.img}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-20 h-20 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm ${
                      service.is_active
                        ? 'bg-green-500/90 text-white'
                        : 'bg-gray-700/90 text-white'
                    }`}>
                      {service.is_active ? '✓ Activo' : 'Inactivo'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#154360] mb-3 line-clamp-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(service)}
                      className="flex-1 bg-[#7FB3D5] hover:bg-[#5A9FBF] text-white py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-md flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(service)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-md flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Eliminar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#154360] to-[#7FB3D5] p-4 sm:p-6 rounded-t-3xl flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white">
                      {editingService ? 'Editar Servicio' : 'Nuevo Servicio'}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="text-white/80 hover:text-white transition-colors p-1.5 sm:p-2 hover:bg-white/20 rounded-xl"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-4 sm:space-y-6 overflow-y-auto">
                {/* Título */}
                <div>
                  <label className="block text-gray-800 font-bold mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#7FB3D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Título del Servicio *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#7FB3D5] focus:border-[#7FB3D5] transition-all outline-none text-gray-800 text-sm sm:text-base"
                    placeholder="Ej: Consulta Veterinaria"
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-gray-800 font-bold mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#7FB3D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    Descripción *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#7FB3D5] focus:border-[#7FB3D5] transition-all outline-none resize-none text-gray-800 text-sm sm:text-base"
                    placeholder="Describe el servicio y sus beneficios..."
                  ></textarea>
                </div>

                {/* Imagen */}
                <div>
                  <label className="block text-gray-800 font-bold mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#7FB3D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Imagen del Servicio
                  </label>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mb-4 relative">
                      <div className="relative w-full h-64 rounded-xl overflow-hidden border-2 border-gray-200">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setSelectedFile(null);
                          setFormData({ ...formData, img: '' });
                        }}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-lg transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Upload Button */}
                  <div className="space-y-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full bg-gradient-to-r from-[#7FB3D5] to-[#A9DFBF] hover:from-[#5A9FBF] hover:to-[#7FB3D5] text-white py-3 sm:py-4 rounded-xl font-semibold transition-all hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      {selectedFile ? 'Cambiar Imagen' : imagePreview ? 'Cambiar Imagen' : 'Seleccionar Imagen'}
                    </button>
                    <p className="text-xs sm:text-sm text-gray-500 text-center">
                      Formatos: JPG, PNG, WEBP o GIF • Tamaño máximo: 5MB
                    </p>
                  </div>
                </div>

                {/* Estado */}
                <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border-2 border-gray-200">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1">
                      <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0 ${formData.is_active ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <div className="flex-1 min-w-0">
                        <label htmlFor="is_active" className="text-gray-800 font-bold cursor-pointer block text-sm sm:text-base">
                          Estado del Servicio
                        </label>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {formData.is_active ? 'El servicio será visible en el sitio web' : 'El servicio estará oculto'}
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input
                        type="checkbox"
                        id="is_active"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 sm:w-14 sm:h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#7FB3D5]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 sm:after:h-6 sm:after:w-6 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    disabled={saveLoading || uploading}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={saveLoading || uploading}
                    className="flex-1 bg-gradient-to-r from-[#5A9FBF] to-[#7FB3D5] hover:from-[#154360] hover:to-[#5A9FBF] text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl flex items-center justify-center gap-2"
                  >
                    {saveLoading || uploading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{uploading ? 'Subiendo...' : 'Guardando...'}</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="hidden sm:inline">{editingService ? 'Actualizar Servicio' : 'Crear Servicio'}</span>
                        <span className="sm:hidden">{editingService ? 'Actualizar' : 'Crear'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm.show && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={cancelDelete}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Icon Header */}
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 sm:p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center"
                >
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  ¿Eliminar Servicio?
                </h3>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 text-center">
                <p className="text-gray-700 text-base sm:text-lg mb-2">
                  Estás a punto de eliminar el servicio:
                </p>
                <p className="text-xl sm:text-2xl font-bold text-[#154360] mb-4 break-words">
                  "{deleteConfirm.serviceName}"
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 mb-4 sm:mb-6 text-left rounded-lg">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <p className="text-red-800 font-bold text-xs sm:text-sm">¡Advertencia!</p>
                      <p className="text-red-700 text-xs sm:text-sm mt-1">
                        Esta acción no se puede deshacer.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={cancelDelete}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all hover:scale-[1.02] shadow-md"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all hover:scale-[1.02] shadow-xl flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="whitespace-nowrap">Sí, Eliminar</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
