import { BLOG_DETAIL } from '@/shared/api/endpoints'
import type {BlogDetailType } from './type'
import { cookies } from 'next/headers'

export const EMPTY_EVENT_OR_AREA_DETAIL: BlogDetailType = {
  id: "string",
  title: "string",
  city: "string",
  description: "string",
  count_views: 0,
  created_at: "2025-07-05T16:37:28.915083+03:00",
  gallery_items: [],
  subdiscipline: { id: 'f5bbfe83-dd12-4831-86d8-d38fb4614677', name: 'эмсиинг' }

}

export async function getBlogDetail(slug: string): Promise<BlogDetailType | 404> {
  const cookieStore = await cookies()
  const sessionid = cookieStore.get('sessionid')?.value

  try {
    const res = await fetch(BLOG_DETAIL(slug), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(sessionid ? { 'Cookie': `sessionid=${sessionid}` } : {}),
      },

    })

    if (res.status === 404) return 404

    if (!res.ok) return EMPTY_EVENT_OR_AREA_DETAIL

    return await res.json()
  } catch {
    return EMPTY_EVENT_OR_AREA_DETAIL
  }
}