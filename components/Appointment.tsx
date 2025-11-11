'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function Appointment() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    mascota: '',
    servicio: '',
    fecha: '',
    mensaje: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hola! Me gustaría agendar una cita:
    
*Nombre:* ${formData.nombre}
*Teléfono:* ${formData.telefono}
*Mascota:* ${formData.mascota}
*Servicio:* ${formData.servicio}
*Fecha preferida:* ${formData.fecha}
*Mensaje adicional:* ${formData.mensaje || 'Ninguno'}`;

    const whatsappUrl = `https://wa.me/529242105259?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="cita" ref={ref} className="py-20 bg-gradient-to-b from-[#F8F9F9] via-white to-[#F8F9F9] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#A9DFBF]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7FB3D5]/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-6 py-2 bg-[#A9DFBF]/20 rounded-full"
          >
            <span className="text-sm font-bold text-[#154360] flex items-center gap-2">
              Reserva con Nosotros
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4">
            Agenda tu <span className="gradient-text-green">Cita</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Estamos aquí para cuidar de tu mascota. Contáctanos ahora y agenda tu cita de forma rápida y sencilla.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#A9DFBF]/20 p-3 rounded-full">
                <svg className="w-6 h-6 text-[#154360]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                Completa tus datos
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Tu Nombre *
                </label>
                <input
                  type="text"
                  name="nombre"
                  required
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7FB3D5] focus:border-[#7FB3D5] transition-all outline-none hover:border-gray-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  required
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7FB3D5] focus:border-[#7FB3D5] transition-all outline-none hover:border-gray-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Nombre de tu Mascota *
                </label>
                <input
                  type="text"
                  name="mascota"
                  required
                  value={formData.mascota}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7FB3D5] focus:border-[#7FB3D5] transition-all outline-none hover:border-gray-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Servicio *
                </label>
                <input
                  type="text"
                  name="servicio"
                  required
                  value={formData.servicio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7FB3D5] focus:border-[#7FB3D5] transition-all outline-none hover:border-gray-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Fecha Preferida *
                </label>
                <input
                  type="date"
                  name="fecha"
                  required
                  value={formData.fecha}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7FB3D5] focus:border-[#7FB3D5] transition-all outline-none hover:border-gray-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Mensaje Adicional
                </label>
                <textarea
                  name="mensaje"
                  rows={4}
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7FB3D5] focus:border-[#7FB3D5] transition-all resize-none outline-none hover:border-gray-300"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#5A9FBF] to-[#7FB3D5] hover:from-[#154360] hover:to-[#5A9FBF] text-white py-3 rounded-xl font-bold text-base transition-all hover:scale-105 shadow-xl hover:shadow-[#7FB3D5]/50 flex items-center justify-center space-x-2"
              >
                <span>Agendar por WhatsApp</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </button>
            </form>
          </motion.div>

          {/* Mapa y Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Información de contacto */}
            <div className="bg-gradient-to-br from-[#5A9FBF] to-[#7FB3D5] rounded-3xl p-8 text-white shadow-2xl border border-[#A9DFBF]/20">
              <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Teléfono</p>
                    <a href="tel:9242105259" className="hover:underline">
                      924 210 5259
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">WhatsApp</p>
                    <a
                      href="https://wa.me/529242105259"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      924 210 5259
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Facebook</p>
                    <a
                      href="https://www.facebook.com/hakuna.matata.193757/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      @hakuna.matata
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d236.96590328614!2d-94.52867358834325!3d18.14296740000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85e985007988a1c5%3A0xa25f3d03a21bee88!2sHakuna%20matata!5e0!3m2!1ses-419!2smx!4v1762715495494!5m2!1ses-419!2smx"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
