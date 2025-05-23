export function getYouTubeThumbnail(embedUrl: string) {
  const match = embedUrl.match(/\/embed\/([^?&]+)/);
  return match ? `https://i.ytimg.com/vi/${match[1]}/hqdefault.jpg` : null;
}