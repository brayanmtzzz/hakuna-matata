import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import WhatsAppButton from '@/components/WhatsAppButton';
import Providers from '@/providers/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hakuna Matata - Veterinaria Profesional',
  description: 'Servicios veterinarios profesionales para el cuidado integral de tu mascota. Cirugías, vacunas, estética y más.',
  icons: {
    icon: '/img/logo/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>
        <Providers>
          {children}
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
