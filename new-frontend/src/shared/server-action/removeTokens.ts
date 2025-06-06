'use server'

import { cookies } from 'next/headers'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/shared/settings'

export async function removeTokens() {
  const cookieStore = await cookies()

  cookieStore.delete(ACCESS_TOKEN)
  cookieStore.delete(REFRESH_TOKEN)
}
