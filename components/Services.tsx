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
    <section id="servicios" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Nuestros <span className="text-green-600">Servicios</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios para el bienestar de tu mascota
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-96"></div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden">
                  {service.img ? (
                    <Image
                      src={service.img}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
                      <span className="text-6xl">🐾</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 right-4 text-2xl font-bold text-white">
                    {service.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  <a
                    href="#cita"
                    className="inline-block mt-4 text-green-600 font-semibold hover:text-green-700 transition-colors"
                  >
                    Agendar →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="https://wa.me/529242105259"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl"
          >
            ¿Tienes dudas? Contáctanos por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
