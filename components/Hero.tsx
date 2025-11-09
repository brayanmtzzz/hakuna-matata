'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Hero() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Load Lottie animation
    fetch('/img/lottie/paws animation.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error('Error loading animation:', err));
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float-delay"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-300/10 rounded-full blur-3xl animate-float-slow"></div>
        
        {/* Floating paw prints */}
        <motion.div
          className="absolute top-32 right-1/4 text-white/20 text-6xl"
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🐾
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-1/4 text-white/20 text-5xl"
          animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          🐾
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-block mb-4 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30"
            >
              <span className="text-sm font-semibold flex items-center gap-2">
                <span className="animate-pulse">✨</span>
                Veterinaria Profesional
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight"
            >
              Hakuna Matata
              <motion.span
                className="block text-3xl md:text-4xl lg:text-5xl mt-2 text-yellow-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Sin Preocupaciones
              </motion.span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl mb-4 text-emerald-50 font-medium"
            >
              Cuidado Profesional para tu Mascota
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-base md:text-lg mb-8 text-emerald-100 max-w-xl"
            >
              Servicios veterinarios de calidad con amor y dedicación. Tu mascota merece lo mejor, y en Hakuna Matata nos aseguramos de que reciba el cuidado excepcional que necesita.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#cita"
                className="group bg-white text-emerald-600 px-8 py-4 rounded-full font-bold hover:bg-emerald-50 transition-all hover:scale-105 shadow-2xl hover:shadow-emerald-500/50 flex items-center gap-2"
              >
                <span>Agenda tu Cita</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="tel:9242105259"
                className="group bg-white/10 backdrop-blur-md border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-emerald-600 transition-all hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>924 210 5259</span>
              </a>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1">10+</div>
                <div className="text-sm text-emerald-100">Años de Experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1">1000+</div>
                <div className="text-sm text-emerald-100">Mascotas Felices</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1">24/7</div>
                <div className="text-sm text-emerald-100">Atención</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[500px] xl:h-[600px]">
              {/* Decorative circle */}
              <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl"></div>
              
              {/* Lottie Animation */}
              <div className="relative w-full h-full flex items-center justify-center">
                {animationData ? (
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    className="w-full h-full"
                  />
                ) : (
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="text-white text-center"
                  >
                    <div className="text-9xl mb-4 filter drop-shadow-2xl">🐾</div>
                    <div className="text-8xl mb-4">🐕</div>
                    <div className="text-8xl">🐈</div>
                  </motion.div>
                )}
              </div>
              
              {/* Floating badges */}
              <motion.div
                className="absolute top-10 -left-10 bg-white rounded-2xl p-4 shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">⭐</div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Calificación</div>
                    <div className="text-lg font-bold text-emerald-600">5.0</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute bottom-10 -right-10 bg-white rounded-2xl p-4 shadow-2xl"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">💚</div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Certificados</div>
                    <div className="text-lg font-bold text-emerald-600">100%</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white text-center cursor-pointer"
          onClick={() => document.getElementById('nosotros')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <p className="mb-2 text-sm font-medium">Desliza hacia abajo</p>
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
