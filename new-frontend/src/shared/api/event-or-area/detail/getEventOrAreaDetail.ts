import { EVENT_OR_AREA_DETAIL } from '@/shared/api/endpoints'
import type {EventOrAreaDetailType } from './type'
import { cookies } from 'next/headers'
import { ACCESS_TOKEN } from '@/shared/settings'

export const EMPTY_EVENT_OR_AREA_DETAIL: EventOrAreaDetailType = {
  id: "string",
  title: "string",
  card_image: "string",
  city: "string",
  starting_date: "string",
  ending_date: "string",
  service_id: "string",
  description: "string",
  address: "string",
  yandex_address: "string",
  format_type: 'image',
  video_url: null,
  image: 'string',
  region: 'string',
  is_favorite: false,
  sub_discipline: { id: 'c5d59780-821e-4620-b310-98dbcf88c963', name: 'рэп' },
}

export async function getEventOrAreaDetail(slug: string, type: 'event' | 'area'): Promise<EventOrAreaDetailType | 404> {
  const cookieStore = await cookies();
  const access_token = cookieStore.get(ACCESS_TOKEN)?.value;
  try {
    const res = await fetch(`${EVENT_OR_AREA_DETAIL(slug)}?type=${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(access_token && { 'Authorization': `JWT ${access_token}` }), },
    })

    if (!res.ok) return 404;

    return res.json()
  } catch {
    return EMPTY_EVENT_OR_AREA_DETAIL;
  }
}