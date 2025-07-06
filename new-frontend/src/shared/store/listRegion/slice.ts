import { StateCreator } from 'zustand/vanilla'
import type { RegionStateType} from './type'
import { getFilterRegion } from '@/shared/api/filter/region/getFilterRegion'
import { StoreState } from '@/shared/store/type'

export const createRegionSlice: StateCreator<
  StoreState, [], [], RegionStateType
> = (set, get) => ({
  regions: [],

  fetchRegions: async () => {
    if (get().listRegion.regions.length) return

    const data = await getFilterRegion()

    set(state => ({
      listRegion: {
        ...state.listRegion,
        regions: data
      }
    }))
  }
})
