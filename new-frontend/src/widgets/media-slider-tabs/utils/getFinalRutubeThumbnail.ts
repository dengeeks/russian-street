
export async function getFinalRutubeThumbnail(videoId: string): Promise<string | null> {
  const endpoint = `https://rutube.ru/api/video/${videoId}/thumbnail/?redirect=1`;

  try {
    const response = await fetch(endpoint, {
      method: 'HEAD',
      redirect: 'manual',
      next: { revalidate: 60 * 60 * 24 },
    });

    const location = response.headers.get('location');
    return location || null;
  } catch (error) {
    console.error('Failed to get Rutube thumbnail:', error);
    return null;
  }
}
