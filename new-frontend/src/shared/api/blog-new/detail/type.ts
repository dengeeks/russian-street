export type GalleryItem = {
  id: string;
  format_type: 'video_url' | 'image';
  image: string | null;
  video_url: string | null;
  is_main: boolean;
};

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

