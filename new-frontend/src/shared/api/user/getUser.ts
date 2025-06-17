import { USER_GET } from '@/shared/api/endpoints'
import { fetchWithAuth } from '@/shared/api/fetchWithAuth'

export type UserType = {
  email: string;
  first_name: string;
  last_name: string | null;
  middle_name: string | null;
  phone_number: string | null;
  status: string | null;
  region: string | null;
  avatar: string | null;
  uuid: string;
} | null;


export async function getUser(): Promise<UserType> {
  try {
    const res = await fetchWithAuth(USER_GET(), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    if (!res.ok) return null

    return res.json()
  } catch {
    return null
  }
}