'use server';

import { cookies } from 'next/headers'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/shared/settings';

async function getTokenFromCookies(tokenName: string): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(tokenName)?.value ?? null;
}

export async function getAccessAction() {
  return getTokenFromCookies(ACCESS_TOKEN);
}

export async function getRefreshAction() {
  return getTokenFromCookies(REFRESH_TOKEN);
}