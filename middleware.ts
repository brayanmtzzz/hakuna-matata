import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

export async function middleware(request: NextRequest) {
  const session = await auth();

  // Proteger rutas /admin excepto /admin/login
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (request.nextUrl.pathname === '/admin/login') {
      // Si ya está autenticado, redirigir al dashboard
      if (session) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    }

    // Para otras rutas admin, verificar autenticación
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
