import { STATIC_COOPERATION } from '@/shared/api/endpoints'

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
    const res = await fetch(STATIC_COOPERATION(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'force-cache',
    });

    if (!res.ok) {
      return EMPTY_COOPERATION;
    }

    return await res.json();
  } catch {
    return EMPTY_COOPERATION;
  }
}
