import { MAP_REGION_LIST } from '@/shared/api/endpoints'
import { fetchWithAuth } from '@/shared/api/fetchWithAuth'
import type { MapRegionListType } from './type'

export const EMPTY_MAP_REGION_LIST: MapRegionListType = {
  regions: [],
  total_events: 0,
  total_areas: 0,
}

export async function getMapRegionList(): Promise<MapRegionListType> {
  try {
    const res = await fetchWithAuth(MAP_REGION_LIST, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      requireAuth: false,
    })

    if (!res.ok) return EMPTY_MAP_REGION_LIST;

    return res.json()
  } catch {
    return EMPTY_MAP_REGION_LIST;
  }
}