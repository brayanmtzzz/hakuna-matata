'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Stethoscope, Clock, Shield } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const features = [
    {
      icon: Stethoscope,
      title: 'Atención Personalizada',
      description: 'Nos adaptamos a las necesidades de cada mascota',
      color: 'from-[#7FB3D5] to-[#A9DFBF]',
    },
    {
      icon: Shield,
      title: 'Servicio Confiable',
      description: 'Atención veterinaria en la que puedes confiar',
      color: 'from-[#154360] to-[#7FB3D5]',
    },
    {
      icon: Heart,
      title: 'Amor por los Animales',
      description: 'Tratamos a tu mascota como parte de nuestra familia',
      color: 'from-[#A9DFBF] to-[#7FB3D5]',
    },
    {
      icon: Clock,
      title: 'Disponibilidad',
      description: 'Horarios flexibles para tu comodidad',
      color: 'from-[#7FB3D5] to-[#154360]',
    },
  ];

  return (
    <section id="nosotros" ref={ref} className="py-20 bg-gradient-to-b from-white via-[#F8F9F9] to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-[#A9DFBF]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-[#7FB3D5]/10 rounded-full blur-3xl"></div>
      
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
              Sobre Nosotros
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4">
            ¿Por qué elegir{' '}
            <span className="gradient-text-green">Hakuna Matata?</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Somos tu mejor opción para el cuidado integral de tu mascota con profesionalismo y amor
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#7FB3D5]/0 to-[#A9DFBF]/0 group-hover:from-[#7FB3D5]/5 group-hover:to-[#A9DFBF]/5 transition-all duration-500"></div>
              
              <div className="relative z-10">
                <motion.div
                  className={`mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <feature.icon className="w-8 h-8 text-white" strokeWidth={2} />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#154360] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
              
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#A9DFBF]/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative bg-gradient-to-br from-[#5A9FBF] to-[#7FB3D5] rounded-3xl p-10 md:p-16 text-white shadow-2xl overflow-hidden"
        >
          {/* Animated background patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-float-delay"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 }}
              >
                <h3 className="text-2xl md:text-3xl font-extrabold mb-6 leading-tight">
                  Nuestra Misión
                </h3>
                <p className="text-sm md:text-base text-white/90 mb-6 leading-relaxed">
                  En Hakuna Matata, nos dedicamos a proporcionar atención
                  veterinaria excepcional con compasión y profesionalismo. Cada
                  mascota que cruza nuestra puerta recibe el mismo cuidado amoroso
                  que daríamos a nuestras propias mascotas.
                </p>
                <p className="text-sm md:text-base text-white/90 leading-relaxed">
                  Nuestro compromiso es mantener a tu compañero peludo feliz,
                  saludable y lleno de vida. Porque en Hakuna Matata, no hay
                  preocupaciones cuando se trata de la salud de tu mascota.
                </p>
              </motion.div>
            </div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.9 }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-2xl">
                <div className="space-y-5">
                  <motion.div
                    className="flex items-center space-x-4 group cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-all">
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
                    <span className="text-base font-semibold">Atención personalizada</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center space-x-4 group cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-all">
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
                    <span className="text-base font-semibold">Experiencia y confianza</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center space-x-4 group cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-all">
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
                    <span className="text-base font-semibold">Precios accesibles</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
