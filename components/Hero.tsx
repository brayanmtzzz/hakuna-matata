'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-400 via-teal-500 to-blue-500">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float-delay"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Hakuna Matata
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl mb-4 text-green-50"
            >
              Cuidado Profesional para tu Mascota
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg mb-8 text-green-100"
            >
              Servicios veterinarios de calidad con amor y dedicación. Tu mascota merece lo mejor.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#cita"
                className="bg-white text-green-600 px-8 py-4 rounded-full font-bold hover:bg-green-50 transition-all hover:scale-105 shadow-2xl"
              >
                Agenda tu Cita
              </a>
              <a
                href="tel:9242105259"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-green-600 transition-all hover:scale-105"
              >
                Llamar: 924 210 5259
              </a>
            </motion.div>
          </motion.div>

          {/* Right Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full h-96 md:h-[500px]">
              {/* Add Lottie animation here if available */}
              <div className="w-full h-full flex items-center justify-center">
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-white text-center"
                >
                  <div className="text-9xl">🐾</div>
                  <p className="text-2xl font-bold mt-4">Sin Preocupaciones</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white text-center"
        >
          <p className="mb-2">Desliza hacia abajo</p>
          <svg
            className="w-6 h-6 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
