export type GalleryItem = {
  id: string;
  format_type: 'video_url' | 'image';
  image: string | null;
  video_url: string | null;
  is_main: boolean;
};

export type DetailDisciplineType = {
  id: string;
  name: string;
  description: string;
  gallery_items: GalleryItem[];
  discipline: string;
};
