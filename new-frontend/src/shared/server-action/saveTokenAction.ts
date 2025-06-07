'use server';

import { cookies } from 'next/headers';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/shared/settings';

type SaveTokenOptions = {
  access?: string;
  refresh?: string;
};


export async function saveTokenAction({ access, refresh }: SaveTokenOptions) {
  const cookieStore = await cookies();
  if (access) {
    cookieStore.set(ACCESS_TOKEN, access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 день
      path: '/',
      sameSite: 'lax',
    });
  }

  if (refresh) {
    cookieStore.set(REFRESH_TOKEN, refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 дней
      path: '/',
      sameSite: 'lax',
    });
  }

  return { success: true };
}