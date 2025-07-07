export type EventOrAreaType = 'event' | 'area';

export type GalleryItem = MediaFormatType & {
  id: string;
  is_main: boolean;
};

export type SubDisciplineType = {
  id: string;
  name: string;
};

export type BaseEventOrAreaItem = {
  id: string;
  title: string;
  card_image: string;
  city: string;
  starting_date: string;
  ending_date: string;
  is_favorite: boolean;
  sub_discipline: SubDisciplineType;
};

export type MediaFormatType = {
  format_type: 'video_url' | 'image';
  video_url: string | null;
  image: string | null;
};
