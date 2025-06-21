import { USER_UPDATE } from '@/shared/api/endpoints'
import { fetchWithAuth } from '@/shared/api/fetchWithAuth'

export type UserUpdateType = {
  email?: string
  first_name?: string
  last_name?: string
  middle_name?: string
  phone_number?: string
  region?: string
  avatar?: string
}

export async function patchUserUpdate(data: UserUpdateType | FormData) {
  const isFormData = data instanceof FormData

  const res = await fetchWithAuth(USER_UPDATE, {
    method: 'PATCH',
    headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
    body: isFormData ? data : JSON.stringify(data)
  })

  return {
    status: res.status,
    data: await res.json(),
  };
}