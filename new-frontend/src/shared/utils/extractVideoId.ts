import type { VideoSource } from '@/shared/ui/MediaSwitcher/type'

export function extractVideoId(input: string): VideoSource {
  // iframe поддержка — достаём src, если есть
  const srcMatch = input.match(/src="([^"]+)"/);
  const url = srcMatch ? srcMatch[1] : input;

  // YouTube
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    return { type: 'youtube', id: ytMatch[1] };
  }

  // VK: обычная ссылка
  const vkMatch = url.match(/vk\.com\/video([-0-9]+)_([0-9]+)/);
  if (vkMatch) {
    return { type: 'vk', id: `${vkMatch[1]}_${vkMatch[2]}` };
  }

  // VK: iframe embed link (video_ext.php)
  const vkExtMatch = url.match(/vk\.com\/video_ext\.php.*?[?&]oid=([-0-9]+).*?[?&]id=([0-9]+)/);
  if (vkExtMatch) {
    return { type: 'vk', id: `${vkExtMatch[1]}_${vkExtMatch[2]}` };
  }

  // RuTube
  const rutubeMatch = url.match(/rutube\.ru\/(?:video|play\/embed)\/([a-f0-9]+)/i);
  if (rutubeMatch) {
    return { type: 'rutube', id: rutubeMatch[1] };
  }

  return { type: 'youtube', id: 'Ks0eHBSNFwA' };
}
