import { EVENT_OR_AREA_TYPES_CATALOG } from '@/shared/api/endpoints'
import {EventOrAreaTypesCatalogType } from './type'
import { EventOrAreaType } from '@/shared/api/type'

export const EMPTY_EVENT_OR_AREA_TYPES_CATALOG: EventOrAreaTypesCatalogType[] = []



export async function getEventOrAreaTypesCatalog(type: EventOrAreaType): Promise<EventOrAreaTypesCatalogType[]> {
  try {
    const res = await fetch(`${EVENT_OR_AREA_TYPES_CATALOG}?type=${type}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    if (!res.ok) return EMPTY_EVENT_OR_AREA_TYPES_CATALOG

    return res.json()
  } catch {
    return EMPTY_EVENT_OR_AREA_TYPES_CATALOG
  }
}