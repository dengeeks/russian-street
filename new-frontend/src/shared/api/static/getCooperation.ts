import { STATIC_COOPERATION } from '@/shared/api/endpoints'
import { REVALIDATE_TIME } from '@/shared/settings'

export type CooperationType = {
  cooperation: {
    text: string;
    partners_count: string;
    projects_count: string;
  } | null;
}


// заглушка при ошибке
const EMPTY_COOPERATION: CooperationType = {
  cooperation: null,
};


export async function getCooperation(): Promise<CooperationType> {
  try {
    const res = await fetch(STATIC_COOPERATION, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!res.ok) {
      return EMPTY_COOPERATION;
    }

    return await res.json();
  } catch {
    return EMPTY_COOPERATION;
  }
}
