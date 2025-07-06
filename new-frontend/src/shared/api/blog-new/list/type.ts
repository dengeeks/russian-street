export type BlogListType = {
  count: number;
  total_pages: number;
  current_page: number;
  results: {
    id: string;
    title: string;
    card_image: string;
    created_at: string;
    city: string;
  }[]
}

export type BlogListFilterType = {
  region_id?: string;
  city_id?: string;
  subdiscipline_ids?: string;
  sort?: string;
  page?: number;
  page_size: number;
}