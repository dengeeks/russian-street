import { useCallback, useEffect, useState } from 'react'
import { FilterRegionType } from '@/shared/api/filter/region/type'
import { EMPTY_FILTER_REGION, getFilterRegion } from '@/shared/api/filter/region/getFilterRegion'

export function useCityList(region_id?: string) {
  const [cities, setCities] = useState<FilterRegionType[]>(EMPTY_FILTER_REGION)

  const fetchCity = useCallback(async () => {
    if (!region_id) return
    const data = await getFilterRegion(region_id)
    setCities(data)
  }, [region_id, setCities])

  useEffect(() => {
    void fetchCity()
  }, [fetchCity])

  return { cities }
}
