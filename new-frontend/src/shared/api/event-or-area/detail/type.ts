
export type EventOrAreaDetailType = {
  id: string;
  title: string;
  card_image: string;
  city: string;
  starting_date: string;
  ending_date: string;
  service_id: string;
  description: string;
  address: string;
  yandex_address: string;
  format_type: 'video_url' | 'image';
  video_url: string | null;
  image: string | null;
  region: string;
  is_favorite: boolean;
  sub_discipline: { id: string, name: string },

}