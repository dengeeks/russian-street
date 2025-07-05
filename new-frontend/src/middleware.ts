import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/shared/settings';

export function middleware(request: NextRequest) {
  const { pathname} = request.nextUrl

  // Защищаем доступ к /profile
  if (pathname === '/profile') {
    const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;
    const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;

    const isAuthenticated = Boolean(accessToken && refreshToken);

    if (!isAuthenticated) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/';
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/profile',
  ],
};