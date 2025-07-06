import { FilterRegionType } from '@/shared/api/filter/region/type'
import { ReactNode } from 'react'

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
}

export interface CommonFiltersProps extends BaseFilterProps {
  cities: FilterRegionType[];
}

export interface FilterMobileProps extends BaseFilterProps {
  cities: FilterRegionType[];
}