import { BaseEventOrAreaItem, EventOrAreaType } from '@/shared/api/type'

export type FavoriteItemType = BaseEventOrAreaItem & {
  description: string;
};

export type FavoriteListType = {
  count: number;
  total_pages: number;
  current_page: number;
  results: FavoriteItemType[]
}

export type FavoriteFilterType = {
  type: EventOrAreaType;
  page?: number;
  page_size: number;
}