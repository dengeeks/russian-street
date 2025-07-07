import type { BaseEventOrAreaItem, EventOrAreaType } from '@/shared/api/type'

export type EventOrAreaItem = BaseEventOrAreaItem & {
  address: string;
};

export type EventOrAreaListType = {
  count: number;
  total_pages: number;
  current_page: number;
  results: EventOrAreaItem[]
}

export type EventFilterType = {
  type: EventOrAreaType;
  region_id?: string;
  city_id?: string;
  type_ids?: string;
  subdiscipline_ids?: string;
  starting_date?: string;
  ending_date?: string;
  sort?: string;
  page?: number;
  page_size: number;
}