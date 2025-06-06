import { USER_GET } from '@/shared/api/endpoints'
import { getAccessAction} from '@/shared/server-action/getTokenAction'
import {postTokenRefresh} from '@/shared/api/user/postTokenRefresh'
import { saveTokenAction } from '@/shared/server-action/saveTokenAction'

export type UserType = {
  email: string;
  first_name: string;
  last_name: string;
} | null


export async function getUser(): Promise<UserType> {
  const accessToken = await getAccessAction()

  const fetchUser = async (token: string) => {
    const res = await fetch(USER_GET(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })

    if (res.status === 401) return null
    if (!res.ok) throw new Error('Не удалось получить данные пользователя')

    return res.json()
  }

  let user = accessToken ? await fetchUser(accessToken) : null

  // Если токен протух и вернулся 401 — пробуем обновить токен и повторить
  if (!user) {
    const newAccessToken = await postTokenRefresh()
    if (!newAccessToken) return null

    await saveTokenAction({ access: newAccessToken })
    user = await fetchUser(newAccessToken)
  }

  return user

}
