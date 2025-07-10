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

export type EventFilterType = EventFilterSelectType & {
  type: EventOrAreaType;
  type_ids?: string;
  starting_date?: string;
  ending_date?: string;
  page?: number;
  page_size: number;
}

export type EventFilterSelectType = {
  region_id?: string;
  city_id?: string;
  subdiscipline_ids?: string;
  sort?: string;
}