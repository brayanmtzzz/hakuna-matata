'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const features = [
    {
      icon: '🏥',
      title: 'Instalaciones Modernas',
      description: 'Equipamiento de última generación para el mejor cuidado',
    },
    {
      icon: '👨‍⚕️',
      title: 'Personal Calificado',
      description: 'Veterinarios certificados con años de experiencia',
    },
    {
      icon: '💚',
      title: 'Amor por los Animales',
      description: 'Tratamos a tu mascota como parte de nuestra familia',
    },
    {
      icon: '🕐',
      title: 'Disponibilidad',
      description: 'Horarios flexibles para tu comodidad',
    },
  ];

  return (
    <section id="nosotros" ref={ref} className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            ¿Por qué elegir{' '}
            <span className="text-green-600">Hakuna Matata?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Somos tu mejor opción para el cuidado integral de tu mascota
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              <div className="text-6xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-gradient-to-r from-green-500 to-teal-500 rounded-3xl p-10 md:p-16 text-white shadow-2xl"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Nuestra Misión
              </h3>
              <p className="text-lg text-green-50 mb-6">
                En Hakuna Matata, nos dedicamos a proporcionar atención
                veterinaria excepcional con compasión y profesionalismo. Cada
                mascota que cruza nuestra puerta recibe el mismo cuidado amoroso
                que daríamos a nuestras propias mascotas.
              </p>
              <p className="text-lg text-green-50">
                Nuestro compromiso es mantener a tu compañero peludo feliz,
                saludable y lleno de vida. Porque en Hakuna Matata, no hay
                preocupaciones cuando se trata de la salud de tu mascota.
              </p>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-full">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-lg">Atención personalizada</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-full">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-lg">Tecnología de punta</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-full">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-lg">Precios accesibles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
