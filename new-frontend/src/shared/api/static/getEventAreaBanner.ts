import { STATIC_EVENT_AREA } from '@/shared/api/endpoints'
import { REVALIDATE_TIME } from '@/shared/settings'
import type { EventOrAreaType, MediaFormatType } from '@/shared/api/type'

export type EventAreaBannerItem = {
  title: string;
  type: EventOrAreaType;
} & MediaFormatType;

export type EventAreaBannerType = {
  event: EventAreaBannerItem[];
}

// заглушка при ошибке
export const EMPTY_STATIC_EVENT_AREA: EventAreaBannerType = {
  event: [],
};


export async function getEventAreaBanner(): Promise<EventAreaBannerType> {
  try {
    const res = await fetch(STATIC_EVENT_AREA, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!res.ok) {
      return EMPTY_STATIC_EVENT_AREA;
    }

    return await res.json();
  } catch {
    return EMPTY_STATIC_EVENT_AREA;
  }
}
