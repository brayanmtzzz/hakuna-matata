'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import animalCareLoading from '@/public/img/lottie/Animal care Loading.json';

export default function Hero() {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    // Fetch images from API
    const loadImages = async () => {
      try {
        const res = await fetch('/api/hero-images');
        const data = await res.json();
        if (data.images && data.images.length > 0) {
          setImages(data.images);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error loading hero images:', err);
        setIsLoading(false);
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

  // Preload current background image. Only toggle `imageLoaded` for the first page load
  useEffect(() => {
    if (!images || images.length === 0) return;
    const img = new Image();
    img.src = images[currentIndex];

    if (firstLoad) {
      setImageLoaded(false);
      img.onload = () => {
        setImageLoaded(true);
        setFirstLoad(false);
      };
      img.onerror = () => {
        setImageLoaded(true);
        setFirstLoad(false);
      };
    } else {
      // Preload silently for subsequent slides (don't affect `imageLoaded`)
      img.onload = () => {};
      img.onerror = () => {};
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [images, currentIndex, firstLoad]);

  useEffect(() => {
    const active = Boolean(isLoading || (firstLoad && !imageLoaded));
    try {
      (window as any).__HM_PRELOADER_ACTIVE = active;
      window.dispatchEvent(new CustomEvent('hm:preloader', { detail: active }));
    } catch (e) {
    }

    return () => {
      try {
        (window as any).__HM_PRELOADER_ACTIVE = false;
        window.dispatchEvent(new CustomEvent('hm:preloader', { detail: false }));
      } catch (e) {}
    };
  }, [isLoading, firstLoad, imageLoaded]);

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Image Carousel Background */}
      <div className="absolute inset-0 w-full h-full">
        {!isLoading && images.length > 0 && (
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

      {/* Preloader (full page): show the same loading screen as admin while the page finishes loading */}
      {(isLoading || (firstLoad && !imageLoaded)) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#F8F9F9] to-[#D5DBDB]">
          <div className="flex flex-col items-center">
            <Lottie animationData={animalCareLoading} loop={true} className="w-64 h-64" />
            <p className="text-xl text-gray-600 font-semibold mt-4">Cargando...</p>
          </div>
        </div>
      )}

      {/* Dark overlay for hero (restored) */}
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
      <div className="container mx-auto px-4 py-6 sm:py-8 relative z-10 h-full flex items-center">
        <div className="w-full max-w-4xl">
          {/* Content */}
          {/** show content after images loaded initially; after first load keep content visible during slide changes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            // contentVisible is true when not loading and either initial image loaded or we've passed first load
            animate={{ opacity: (!isLoading && (firstLoad ? imageLoaded : true)) ? 1 : 0, y: (!isLoading && (firstLoad ? imageLoaded : true)) ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight drop-shadow-2xl"
            >
              Hakuna Matata
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl md:text-3xl lg:text-4xl mb-4 text-[#A9DFBF] font-bold drop-shadow-lg"
            >
              Cuidado Profesional para tu Mascota
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-base md:text-lg lg:text-xl mb-8 text-white max-w-2xl drop-shadow-lg"
            >
              Servicios veterinarios de calidad con amor y dedicación. Tu mascota merece lo mejor, y en Hakuna Matata nos aseguramos de que reciba el cuidado excepcional que necesita.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8"
            >
              <a
                href="#cita"
                className="bg-white text-[#154360] px-7 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base md:text-lg hover:bg-[#F8F9F9] transition-all hover:scale-105 shadow-2xl hover:shadow-[#7FB3D5]/50 flex items-center justify-center gap-2 group"
              >
                <span>Agenda tu Cita</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="tel:9242105259"
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-7 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base md:text-lg hover:bg-white hover:text-[#154360] transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
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
              transition={{ delay: 1.1 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 max-w-lg bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20"
            >
              <div className="text-center">
                <div className="text-2xl md:text-4xl font-bold mb-1 drop-shadow-lg">5.0</div>
                <div className="text-xs md:text-sm text-white/90">Calificación</div>
              </div>
              <div className="text-center border-x border-white/20">
                <div className="text-2xl md:text-4xl font-bold mb-1 drop-shadow-lg">300+</div>
                <div className="text-xs md:text-sm text-white/90">Mascotas Felices</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-4xl font-bold mb-1 drop-shadow-lg">24/7</div>
                <div className="text-xs md:text-sm text-white/90">Atención</div>
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
