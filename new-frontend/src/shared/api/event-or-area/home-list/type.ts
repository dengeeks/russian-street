import { EventOrAreaType } from '@/shared/api/type'

export type EventHomeFilterType = {
  type: EventOrAreaType;
  region_id?: string;
  limit?: number
}

export type EventOrAreaHomeListType = {
  id: string;
  title: string;
  card_image: string;
  city: string;
  is_favorite: boolean;
  address: string;
  starting_date?: string;
}
