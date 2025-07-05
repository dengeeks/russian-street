import { extractVideoId } from '@/shared/utils/extractVideoId'

export function getVideoThumbnail(embedUrl: string | null): string | null {
  if (!embedUrl) return null

  const { id, type } = extractVideoId(embedUrl)

  if (type === 'youtube') {
    return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
  }

  return null
}
