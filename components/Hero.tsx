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
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
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

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
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
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight"
            >
              Hakuna Matata
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl lg:text-3xl mb-3 text-yellow-300 font-medium"
            >
              Cuidado Profesional para tu Mascota
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-sm md:text-base mb-6 text-white max-w-xl"
            >
              Servicios veterinarios de calidad con amor y dedicación. Tu mascota merece lo mejor, y en Hakuna Matata nos aseguramos de que reciba el cuidado excepcional que necesita.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 mb-6"
            >
              <a
                href="#cita"
                className="bg-white text-emerald-600 px-6 py-3 rounded-full font-bold text-sm md:text-base hover:bg-emerald-50 transition-all hover:scale-105 shadow-2xl hover:shadow-emerald-500/50 flex items-center justify-center gap-2 group"
              >
                <span>Agenda tu Cita</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="tel:9242105259"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-bold text-sm md:text-base hover:bg-white hover:text-emerald-600 transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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
              className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20"
            >
              <div className="text-center">
                <div className="text-xl md:text-3xl font-bold mb-1">5.0</div>
                <div className="text-xs md:text-sm text-white">Calificación</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-3xl font-bold mb-1">300+</div>
                <div className="text-xs md:text-sm text-white">Mascotas Felices</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-3xl font-bold mb-1">24/7</div>
                <div className="text-xs md:text-sm text-white">Atención</div>
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
