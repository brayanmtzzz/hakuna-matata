'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

interface Service {
  id: string;
  title: string;
  description: string;
  img: string | null;
  is_active: boolean;
}

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data.filter((s: Service) => s.is_active));
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="servicios" ref={ref} className="py-20 bg-gradient-to-b from-white via-emerald-50/30 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl"></div>
      
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
            className="inline-block mb-4 px-6 py-2 bg-emerald-100 rounded-full"
          >
            <span className="text-sm font-bold text-emerald-700 flex items-center gap-2">
              <span className="text-lg"></span>
              Servicios Profesionales
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4">
            Nuestros <span className="gradient-text-green">Servicios</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Ofrecemos una amplia gama de servicios veterinarios de alta calidad para el bienestar integral de tu mascota
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-2xl h-80 shadow-lg"></div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative overflow-hidden rounded-2xl h-80 bg-white shadow-[0_1px_1px_rgba(0,0,0,0.1),0_2px_2px_rgba(0,0,0,0.1),0_4px_4px_rgba(0,0,0,0.1),0_8px_8px_rgba(0,0,0,0.1),0_16px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_2px_2px_rgba(0,0,0,0.12),0_4px_4px_rgba(0,0,0,0.12),0_8px_8px_rgba(0,0,0,0.12),0_16px_16px_rgba(0,0,0,0.12),0_32px_32px_rgba(0,0,0,0.12)] transition-all duration-700"
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  {service.img ? (
                    <motion.div
                      className="relative w-full h-full"
                      animate={{
                        scale: hoveredCard === service.id ? 1.08 : 1,
                      }}
                      transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                    >
                      <Image
                        src={service.img}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </motion.div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500"></div>
                  )}
                </div>

                {/* Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20"
                  animate={{
                    opacity: hoveredCard === service.id ? 1 : 0.8,
                  }}
                  transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
                />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                  <motion.div
                    className="flex flex-col gap-4"
                    animate={{
                      y: hoveredCard === service.id ? 0 : 20,
                    }}
                    transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                      {service.title}
                    </h3>
                    
                    <motion.div
                      className="overflow-hidden"
                      initial={false}
                      animate={{
                        height: hoveredCard === service.id ? 'auto' : 0,
                        opacity: hoveredCard === service.id ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.7,
                        ease: [0.19, 1, 0.22, 1],
                        opacity: { delay: hoveredCard === service.id ? 0.1 : 0 }
                      }}
                    >
                      <p className="text-white/90 text-base md:text-lg leading-relaxed mb-4">
                        {service.description}
                      </p>
                      
                      <a
                        href="#cita"
                        className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-emerald-50 transition-colors"
                      >
                        <span>Agendar Ahora</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 md:p-12 shadow-2xl">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              ¿Tienes dudas sobre nuestros servicios?
            </h3>
            <p className="text-base md:text-lg text-emerald-50 mb-6 max-w-2xl mx-auto">
              Nuestro equipo está listo para ayudarte. Contáctanos por WhatsApp y te responderemos de inmediato.
            </p>
            <a
              href="https://wa.me/529242105259"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-emerald-600 px-8 py-3 rounded-full font-bold text-base transition-all hover:scale-105 shadow-2xl hover:shadow-white/50"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>Contáctanos por WhatsApp</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
