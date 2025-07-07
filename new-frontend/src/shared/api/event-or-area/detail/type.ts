import type { MediaFormatType, SubDisciplineType } from '@/shared/api/type'

export type EventOrAreaDetailType = MediaFormatType &{
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
  region: string;
  is_favorite: boolean;
  sub_discipline: SubDisciplineType,

}