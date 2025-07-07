import {FilterRegionType} from '@/shared/api/filter/region/type'

export type RegionStateType = {
  regions: FilterRegionType[];
  fetchRegions: () => Promise<void>;
};
