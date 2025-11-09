'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Agenda tu Cita', href: '#cita' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-12 h-12">
              <Image
                src="/img/logo/logo.png"
                alt="Hakuna Matata"
                fill
                className="object-contain"
              />
            </div>
            <span className={`text-xl font-bold transition-colors ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}>
              Hakuna Matata
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-all hover:scale-110 ${
                  isScrolled
                    ? 'text-gray-700 hover:text-green-600'
                    : 'text-white hover:text-green-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="tel:9242105259"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-all hover:scale-105 shadow-lg"
            >
              Llamar Ahora
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden focus:outline-none"
          >
            <div className="space-y-1.5">
              <span
                className={`block w-6 h-0.5 transition-all ${
                  isScrolled ? 'bg-gray-800' : 'bg-white'
                } ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
              ></span>
              <span
                className={`block w-6 h-0.5 transition-all ${
                  isScrolled ? 'bg-gray-800' : 'bg-white'
                } ${isMobileMenuOpen ? 'opacity-0' : ''}`}
              ></span>
              <span
                className={`block w-6 h-0.5 transition-all ${
                  isScrolled ? 'bg-gray-800' : 'bg-white'
                } ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 bg-white rounded-lg shadow-xl p-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <a
              href="tel:9242105259"
              className="block mt-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-center transition-all"
            >
              Llamar Ahora
            </a>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
