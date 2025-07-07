import { GalleryItem } from '@/shared/api/type'

export type BlogDetailType = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  city: string;
  count_views: number;
  gallery_items: GalleryItem[]
  subdiscipline: { id: string, name: string }

}

