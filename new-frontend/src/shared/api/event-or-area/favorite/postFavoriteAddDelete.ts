import { EVENT_ADD_DELETE_FAVORITE } from '@/shared/api/endpoints'
import type {FavoriteAddDeleteType} from "./type"
import { fetchWithAuth } from '@/shared/api/fetchWithAuth'

export async function postFavoriteAddDelete(type: 'event' | 'area', object_id: string): Promise<{ status: number; data: FavoriteAddDeleteType }>  {

  const res = await fetchWithAuth(EVENT_ADD_DELETE_FAVORITE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, object_id }),
  })

  if (res.status === 401) {
    throw new Error('Чтобы добавить в избранное, нужно авторизоваться')
  }

  return {
    status: res.status,
    data: await res.json(),
  };
}