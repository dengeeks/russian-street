import { NextResponse } from 'next/server';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/shared/settings';

export async function POST(req: Request) {
  try {
    const { access, refresh } = await req.json();

    const response = NextResponse.json({ success: true });

    if (access) {
      response.cookies.set(ACCESS_TOKEN, access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 день
        path: '/',
        sameSite: 'lax',
      });
    }

    if (refresh) {
      response.cookies.set(REFRESH_TOKEN, refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30, // 30 дней
        path: '/',
        sameSite: 'lax',
      });
    }

    return response;
  } catch  {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
