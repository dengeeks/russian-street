import { EVENT_OR_AREA_HOME_LIST } from '@/shared/api/endpoints'
import type { EventOrAreaHomeListType, EventHomeFilterType } from './type'
import { buildQueryString } from '@/shared/utils/buildQueryString'

export const EMPTY_EVENT_OR_AREA_HOME_LIST: EventOrAreaHomeListType[] = []

export async function getEventOrAreaList(params: EventHomeFilterType): Promise<EventOrAreaHomeListType[]> {
  const queryString = buildQueryString(params)
  try {
    const res = await fetch(`${EVENT_OR_AREA_HOME_LIST}?${queryString}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) return EMPTY_EVENT_OR_AREA_HOME_LIST;

    return res.json()
  } catch {
    return EMPTY_EVENT_OR_AREA_HOME_LIST;
  }
}