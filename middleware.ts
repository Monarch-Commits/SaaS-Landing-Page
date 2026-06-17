// middleware.ts (root ng project)

import { withAuth } from '@kinde-oss/kinde-auth-nextjs/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Mga routes na hindi kailangan ng check
  const publicRoutes = ['/api/auth', '/invite', '/pending-approval'];

  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  if (isPublic) return NextResponse.next();

  // ✅ Kung nag-aaccess ng dashboard, check ang status
  if (pathname.startsWith('/dashboard')) {
    const kindeUser = request.cookies.get('kinde_user');

    if (!kindeUser) {
      return NextResponse.redirect(new URL('/api/auth/login', request.url));
    }

    try {
      const email = JSON.parse(decodeURIComponent(kindeUser.value))?.email;

      if (!email) {
        return NextResponse.redirect(new URL('/api/auth/login', request.url));
      }

      const user = await prisma.user.findUnique({
        where: { email },
        select: { status: true, companyId: true },
      });

      // ✅ Walang user sa DB
      if (!user) {
        return NextResponse.redirect(new URL('/api/auth/login', request.url));
      }

      // ✅ PENDING — hindi pa approved
      if (user.status === 'PENDING') {
        return NextResponse.redirect(new URL('/pending-approval', request.url));
      }

      // ✅ SUSPENDED
      if (user.status === 'SUSPENDED') {
        return NextResponse.redirect(new URL('/suspended', request.url));
      }

      // ✅ Walang company
      if (!user.companyId) {
        return NextResponse.redirect(new URL('/create-company', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/api/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/pending-approval'],
};
