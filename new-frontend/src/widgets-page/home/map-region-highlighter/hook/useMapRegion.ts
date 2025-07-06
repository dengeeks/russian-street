'use client'
import { useCallback, useEffect, useState } from 'react'

import type { MapRegionListType } from '@/shared/api/region/map-region/type'
import { getMapRegionList, EMPTY_MAP_REGION_LIST } from '@/shared/api/region/map-region/getMapRegionList'

export function useMapRegion() {
  const [mapRegion, setMapRegion] = useState<MapRegionListType>(EMPTY_MAP_REGION_LIST)

  const fetchMapRegion = useCallback(async () => {
    const data = await getMapRegionList()
    setMapRegion(data)
  }, [])

  useEffect(() => {
    void fetchMapRegion()
  }, [fetchMapRegion])

  return { mapRegion }
}
