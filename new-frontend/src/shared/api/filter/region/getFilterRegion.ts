import { FILTER_REGION } from '@/shared/api/endpoints'
import type {FilterRegionType} from "./type"

export const EMPTY_FILTER_REGION: FilterRegionType[] = []


export async function getFilterRegion(region_id?: string): Promise<FilterRegionType[]> {
  try {
    const url = region_id
      ? `${FILTER_REGION}?region_id=${region_id}`
      : FILTER_REGION

    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) return EMPTY_FILTER_REGION;

    return res.json()
  } catch {
    return EMPTY_FILTER_REGION;
  }
}