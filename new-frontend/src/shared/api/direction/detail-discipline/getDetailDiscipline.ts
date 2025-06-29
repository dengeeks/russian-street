import { DETAIL_DISCIPLINE } from '@/shared/api/endpoints'
import { REVALIDATE_TIME } from '@/shared/settings'
import type { DetailDisciplineType } from './type'

// заглушка при ошибке
const EMPTY_SUB_DISCIPLINES: DetailDisciplineType = {
  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  name: "string",
  description: "string",
  gallery_items: [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    format_type: "video_url",
    image: null,
    video_url: "string",
    is_main: true
  }
],
  discipline: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}


export async function getDetailDiscipline(slug: string): Promise<DetailDisciplineType | 404> {
  try {
    const res = await fetch(DETAIL_DISCIPLINE(slug), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: REVALIDATE_TIME }
    })

    if (res.status === 404) {
      return 404;
    }

    if (!res.ok) {
      return EMPTY_SUB_DISCIPLINES
    }

    return await res.json()
  } catch {
    return EMPTY_SUB_DISCIPLINES
  }
}
