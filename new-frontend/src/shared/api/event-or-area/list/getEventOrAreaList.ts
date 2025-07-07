import { EVENT_OR_AREA_LIST } from '@/shared/api/endpoints'
import { fetchWithAuth } from '@/shared/api/fetchWithAuth'
import type { EventFilterType, EventOrAreaListType } from './type'
import { buildQueryString } from '@/shared/utils/buildQueryString'

export const EMPTY_EVENT_OR_AREA_LIST: EventOrAreaListType = {
  count: 0,
  total_pages: 0,
  current_page: 0,
  results: []
}

export async function getEventOrAreaList(params: EventFilterType): Promise<EventOrAreaListType> {
  const queryString = buildQueryString(params)
  try {
    const res = await fetchWithAuth(`${EVENT_OR_AREA_LIST}?${queryString}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      requireAuth: false,
    })

    if (!res.ok) return EMPTY_EVENT_OR_AREA_LIST;

    return res.json()
  } catch {
    return EMPTY_EVENT_OR_AREA_LIST;
  }
}