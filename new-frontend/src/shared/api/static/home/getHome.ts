import { STATIC_HOME } from '@/shared/api/endpoints'
import type { HomeType } from './type'

// заглушка при ошибке
const EMPTY_HOME: HomeType = {
  promotional_video: null,
  about_us: null,
  mission_and_goals_text: null,
  organization_info: null,
  street_images: [],
  mission_images: []
};


export async function getHome(): Promise<HomeType> {
  try {
    const res = await fetch(STATIC_HOME(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'force-cache',
    });

    if (!res.ok) {
      return EMPTY_HOME;
    }

    return await res.json();
  } catch {
    return EMPTY_HOME;
  }
}
