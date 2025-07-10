import type { FilterRegionType } from '@/shared/api/filter/region/type'
import type { ReactNode } from 'react'

export type OnFilterChange<T> = <K extends keyof T>(key: K, value: T[K]) => void;

export type RequiredFilterKeys = {
  region_id?: string;
  city_id?: string;
  subdiscipline_ids?: string;
  sort?: string;
};

export interface BaseFilterProps {
  directions: {
    id: string;
    name: string
  }[];
  filter: RequiredFilterKeys;
  onFilterChange: OnFilterChange<RequiredFilterKeys>;
  children?: ReactNode;
  cities?: FilterRegionType[];
  date?: ReactNode;
}

export interface CommonFiltersProps extends BaseFilterProps {
  cities: FilterRegionType[];
  onRegionRequired?: () => void;
}

export interface FilterMobileProps{
  children: ReactNode;
}