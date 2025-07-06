import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/shared/settings'
import { BLOG_DETAIL } from '@/shared/api/endpoints'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Защищаем доступ к /profile
  if (pathname === '/profile') {
    const accessToken = request.cookies.get(ACCESS_TOKEN)?.value
    const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value

    const isAuthenticated = Boolean(accessToken && refreshToken)

    if (!isAuthenticated) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = '/'
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  const blogSlugMatch = pathname.match(/^\/blog\/([^\/]+)$/)
  if (blogSlugMatch) {
    const sessionid = request.cookies.get('sessionid')?.value

    if (!sessionid) {
      const slug = blogSlugMatch[1]
      const res = await fetch(BLOG_DETAIL(slug), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      })

      if (res.ok) {
        // Берём заголовок set-cookie
        const setCookie = res.headers.get('set-cookie')
        if (setCookie) {
          // Ищем sessionid в заголовке set-cookie
          const match = setCookie.match(/sessionid=([^;]+);?/)
          if (match) {
            const newSessionId = match[1]

            const response = NextResponse.next()

            // Сохраняем куку sessionid
            response.cookies.set('sessionid', newSessionId, {
              httpOnly: true,
              path: '/',
              sameSite: 'lax',
              secure: process.env.NODE_ENV === 'production',
              maxAge: 60 * 60 * 24 * 7
            })

            return response
          }
        }
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile', '/blog/:slug*']
}
