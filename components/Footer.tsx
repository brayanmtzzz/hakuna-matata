'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/img/logo/logo.png"
                  alt="Hakuna Matata"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold">Hakuna Matata</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Veterinaria profesional dedicada al cuidado integral de tu mascota.
              Porque en Hakuna Matata, no hay preocupaciones.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/hakuna.matata.193757/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-green-500 p-3 rounded-full transition-all hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://wa.me/529242105259"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-green-500 p-3 rounded-full transition-all hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#inicio" className="text-gray-400 hover:text-green-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#nosotros" className="text-gray-400 hover:text-green-400 transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="#servicios" className="text-gray-400 hover:text-green-400 transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="#cita" className="text-gray-400 hover:text-green-400 transition-colors">
                  Agenda tu Cita
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="tel:9242105259" className="hover:text-green-400 transition-colors">
                  924 210 5259
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Coatzacoalcos, Veracruz</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© {currentYear} Hakuna Matata. Todos los derechos reservados.</p>
          <p className="mt-2 text-sm">
            Hecho con ❤️ para el cuidado de tu mascota
          </p>
        </div>
      </div>
    </footer>
  );
}
