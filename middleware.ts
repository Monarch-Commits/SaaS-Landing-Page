import { NextResponse } from 'next/server';

export function middleware(req: any) {
  const pathname = req.nextUrl.pathname;

  // example simple protection
  const role = req.cookies.get('role')?.value;

  if (pathname.startsWith('/dashboard/owner') && role !== 'OWNER') {
    return NextResponse.redirect(new URL('/403', req.url));
  }

  return NextResponse.next();
}
