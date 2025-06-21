import { PUBLIC_API_BASE_URL } from '@/shared/settings'

export const getImageUrl = (url?: string) => {
  if (!url) return '/png/mock/mock-admin.png';

  return url.startsWith('/back_media1')
    ? `${PUBLIC_API_BASE_URL}${url}`
    : url;
};