import { STATIC_ABOUT_US } from '@/shared/api/endpoints'
import type { AboutUsType } from './type'

// заглушка при ошибке
const EMPTY_ABOUT_US: AboutUsType = {
  join_street: null,
  mission: null,
  info: null,
};

export async function getAboutUs(): Promise<AboutUsType> {
  try {
    const res = await fetch(STATIC_ABOUT_US(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'force-cache',
    });

    if (!res.ok) {
      return EMPTY_ABOUT_US;
    }

    return await res.json();
  } catch {
    return EMPTY_ABOUT_US;
  }
}
