
import type { VideoSource } from '@/shared/ui/MediaSwitcher/type'

export function extractVideoId(input: string): VideoSource {
  // iframe поддержка — достаём src, если есть
  const srcMatch = input.match(/src="([^"]+)"/);
  const url = srcMatch ? srcMatch[1] : input;

  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    return { type: 'youtube', id: ytMatch[1] };
  }

  // VK
  const vkMatch = url.match(/vk\.com\/video(?:_ext)?\.php.*?[?&]oid=(-?\d+).*?[?&]id=(\d+)/);
  if (vkMatch) {
    return { type: 'vk', id: `${vkMatch[1]}_${vkMatch[2]}` };
  }

  // RuTube
  const rutubeMatch = url.match(/rutube\.ru\/video\/([a-z0-9]+)/i);
  if (rutubeMatch) {
    return { type: 'rutube', id: rutubeMatch[1] };
  }

  return { type: 'youtube', id: 'Ks0eHBSNFwA', };
}
