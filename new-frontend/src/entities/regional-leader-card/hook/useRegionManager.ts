import { useCallback, useEffect, useState } from 'react'

import type { RegionManagerType } from '@/shared/api/region/region-manager/type'
import { getRegionManager, EMPTY_REGION_MANAGER } from '@/shared/api/region/region-manager/getRegionManager'

export function useRegionManager(region_id?: string) {
  const [regionManager, setRegionManager] = useState<RegionManagerType>(EMPTY_REGION_MANAGER)

  const fetchRegionManager = useCallback(async () => {
    if (!region_id) return
    const data = await getRegionManager(region_id)
    setRegionManager(data)
  }, [region_id])

  useEffect(() => {
    void fetchRegionManager()
  }, [fetchRegionManager])

  return { regionManager }
}
