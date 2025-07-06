import { PUBLIC_API_BASE_URL } from '@/shared/settings'

export const getImageUrl = (url?: string) => {
  if (!url) return '/assets/webp/mock/mock-admin.webp';

  return url.startsWith('/back_media')
    ? `${PUBLIC_API_BASE_URL}${url}`
    : url;
};