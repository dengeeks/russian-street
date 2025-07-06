import { useEffect} from 'react'
import useListRegion from '@/shared/store/listRegion'

export function useRegionList() {
  const { regions, fetchRegions } = useListRegion()

  useEffect(() => {
    void fetchRegions()
  }, [fetchRegions])

  return { regions }
}
