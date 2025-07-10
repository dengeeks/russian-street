import { useCallback, useEffect, useMemo, useState } from 'react'
import { EMPTY_FAVORITE_LIST, getFavoriteList } from '@/shared/api/favorite/list/getFavoriteList'
import type { FavoriteFilterType, FavoriteListType } from '@/shared/api/favorite/list/type'

export function useFavoriteList(filter: FavoriteFilterType) {
  const [favoriteList, setFavoriteList] = useState<FavoriteListType>(EMPTY_FAVORITE_LIST)

  const stableFilter = useMemo(() => ({
    page: filter.page,
    page_size: filter.page_size,
    type: filter.type,
  }), [filter.page, filter.page_size, filter.type])

  const fetchFavoriteList = useCallback(async () => {
    const data = await getFavoriteList(stableFilter)
    setFavoriteList(data)
  }, [stableFilter])

  useEffect(() => {
    void fetchFavoriteList()
  }, [fetchFavoriteList])

  return { favoriteList }
}
