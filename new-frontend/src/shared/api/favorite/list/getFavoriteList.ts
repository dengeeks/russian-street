import { FAVORITE_LIST } from '@/shared/api/endpoints'
import { fetchWithAuth } from '@/shared/api/fetchWithAuth'
import type { FavoriteFilterType, FavoriteListType } from './type'

import { buildQueryString } from '@/shared/utils/buildQueryString'


export const EMPTY_FAVORITE_LIST: FavoriteListType = {
  count: 0,
  total_pages: 0,
  current_page: 0,
  results: []
}

export async function getFavoriteList(params: FavoriteFilterType): Promise<FavoriteListType> {
  const queryString = buildQueryString(params)
  try {
    const res = await fetchWithAuth(`${FAVORITE_LIST}?${queryString}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) return EMPTY_FAVORITE_LIST;

    return res.json()
  } catch {
    return EMPTY_FAVORITE_LIST;
  }
}