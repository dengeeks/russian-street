import { STATIC_EVERYONE_LIKES } from '@/shared/api/endpoints'
import { REVALIDATE_TIME } from '@/shared/settings'

export type EveryoneLikesType = {
  everyone_likes: {
    title: string;
    description: string;
  }[];
}



// заглушка при ошибке
const EMPTY_EVERYONE_LIKES: EveryoneLikesType = {
  everyone_likes: [],
};


export async function getEveryoneLikes(): Promise<EveryoneLikesType> {
  try {
    const res = await fetch(STATIC_EVERYONE_LIKES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'force-cache',
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!res.ok) {
      return EMPTY_EVERYONE_LIKES;
    }

    return await res.json();
  } catch {
    return EMPTY_EVERYONE_LIKES;
  }
}
