'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Credenciales incorrectas');
      } else {
        router.push('/admin/dashboard');
      }
    } catch (error) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/admin/loginfondo.webp"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <Image
                src="/img/logo/logo.png"
                alt="Hakuna Matata"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Hakuna Matata
            </h1>
            <p className="text-gray-300">Panel de Administración</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-lg text-center"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-white font-semibold mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-gray-300 hover:text-white transition-colors"
            >
              ← Volver al inicio
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
