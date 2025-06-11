import { USER_TOKEN_REFRESH } from '@/shared/api/endpoints';
import { cookies } from 'next/headers'
import { ACCESS_TOKEN } from '@/shared/settings'

export async function postTokenRefresh(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshToken =  cookieStore.get(ACCESS_TOKEN)?.value;

  if (!refreshToken) {
      return null
  }

  const res = await fetch(USER_TOKEN_REFRESH(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      {
        refresh: refreshToken
      }
    ),
  });

  const json = await res.json();
  const { access } = json;

  if (access) {
    await fetch('/api/save-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ access: access }),
    });
  }
  return access;
}
