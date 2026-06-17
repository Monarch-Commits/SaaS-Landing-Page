// middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = pathname.startsWith('/dashboard');
  const isPendingApproval = pathname.startsWith('/pending-approval');

  if (!isProtected && !isPendingApproval) {
    return NextResponse.next();
  }

  // ✅ Check lang kung naka-login sa Kinde — walang Prisma
  const token = request.cookies.get('kinde_access_token')?.value;

  if (!token && isProtected) {
    return NextResponse.redirect(new URL('/api/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/pending-approval'],
};
