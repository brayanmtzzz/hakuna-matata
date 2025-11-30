'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch images from API
    const loadImages = async () => {
      try {
        const res = await fetch('/api/hero-images');
        const data = await res.json();
        if (data.images && data.images.length > 0) {
          setImages(data.images);
        }
      } catch (err) {
        console.error('Error loading hero images:', err);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    // Auto-advance carousel
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [images.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Image Carousel Background */}
      <div className="absolute inset-0 w-full h-full">
        {images.length > 0 && (
          <>
            {/* Background crossfade using CSS backgrounds (avoids next/image layout-shift in production) */}
            <AnimatePresence initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full bg-center bg-cover"
                style={{ backgroundImage: `url(${images[currentIndex]})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Dark overlay for hero */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>


      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Carousel Indicators */}
      {images.length > 1 && (
        <div className="hidden sm:flex absolute bottom-24 left-1/2 -translate-x-1/2 z-20 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 ${
                index === currentIndex
                  ? 'w-8 h-3 bg-white'
                  : 'w-3 h-3 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Content Overlay */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8 relative z-10 h-full flex items-center">
        <div className="w-full max-w-4xl">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-3 sm:mb-4 leading-tight drop-shadow-2xl"
            >
              Hakuna Matata
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl mb-3 sm:mb-4 text-[#A9DFBF] font-bold drop-shadow-lg"
            >
              Cuidado Profesional para tu Mascota
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-sm sm:text-base md:text-base lg:text-lg xl:text-xl mb-6 sm:mb-8 text-white max-w-2xl drop-shadow-lg leading-relaxed"
            >
              Servicios veterinarios de calidad con amor y dedicación. Tu mascota merece lo mejor, y en Hakuna Matata nos aseguramos de que reciba el cuidado excepcional que necesita.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-3 mb-5 sm:mb-6 md:mb-6"
            >
              <a
                href="#cita"
                className="bg-white text-[#154360] px-5 py-2.5 sm:px-7 sm:py-3 md:px-6 md:py-3 lg:px-7 lg:py-3.5 rounded-full font-bold text-sm sm:text-base md:text-base lg:text-base hover:bg-[#F8F9F9] transition-all hover:scale-105 shadow-2xl hover:shadow-[#7FB3D5]/50 flex items-center justify-center gap-2 group"
              >
                <span>Agenda tu Cita</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="tel:9242105259"
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-5 py-2.5 sm:px-7 sm:py-3 md:px-6 md:py-3 lg:px-7 lg:py-3.5 rounded-full font-bold text-sm sm:text-base md:text-base lg:text-base hover:bg-white hover:text-[#154360] transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-sm sm:text-base md:text-base lg:text-base">924 210 5259</span>
              </a>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-4 lg:gap-5 max-w-lg bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-4 lg:p-5 border border-white/20"
            >
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1 drop-shadow-lg">5.0</div>
                <div className="text-[10px] sm:text-xs md:text-xs lg:text-sm text-white/90 leading-tight">Calificación</div>
              </div>
              <div className="text-center border-x border-white/20">
                <div className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1 drop-shadow-lg">300+</div>
                <div className="text-[10px] sm:text-xs md:text-xs lg:text-sm text-white/90 leading-tight">Mascotas Felices</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1 drop-shadow-lg">24/7</div>
                <div className="text-[10px] sm:text-xs md:text-xs lg:text-sm text-white/90 leading-tight">Atención</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white text-center cursor-pointer"
          onClick={() => document.getElementById('nosotros')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <p className="mb-2 text-sm font-medium drop-shadow-lg">Desliza hacia abajo</p>
          <svg
            className="w-6 h-6 mx-auto drop-shadow-lg"
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
