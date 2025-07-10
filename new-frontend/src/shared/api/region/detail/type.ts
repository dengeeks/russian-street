import { RegionManagerType } from '@/shared/api/region/region-manager/type'

export type RegionManagerWithInfoType = RegionManagerType & {
  info: string
}
export type RegionInfoType = {
  id: string
  name: string
  code: string
  image: string
  info: string
}

export type RegionManagerDetailType = RegionInfoType & {
  manager: RegionManagerWithInfoType;
}