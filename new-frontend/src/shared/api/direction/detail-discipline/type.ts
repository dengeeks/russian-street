import { GalleryItem } from '@/shared/api/type'

export type DetailDisciplineType = {
  id: string;
  name: string;
  description: string;
  gallery_items: GalleryItem[];
  discipline: string;
};
