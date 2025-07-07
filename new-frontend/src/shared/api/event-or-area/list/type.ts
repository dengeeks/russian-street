
export type EventOrAreaListType = {
  count: number;
  total_pages: number;
  current_page: number;
  results: {
    id: string;
    title: string;
    card_image: string;
    city: string;
    starting_date: string;
    is_favorite: boolean;
  }[]
}

export type EventFilterType = {
  type: 'event' | 'area';
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