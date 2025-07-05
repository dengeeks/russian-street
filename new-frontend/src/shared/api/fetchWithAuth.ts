import { getAccessAction, getRefreshAction } from '@/shared/server-action/getTokenAction'
import { postTokenRefresh } from '@/shared/api/user/postTokenRefresh'

type FetchOptions = RequestInit & { retry?: boolean }

export async function fetchWithAuth(input: RequestInfo, options: FetchOptions = {}): Promise<Response> {
  let accessToken = await getAccessAction()

  if (!accessToken) {
    const refreshToken = await getRefreshAction()
    if (refreshToken) {
      accessToken = await postTokenRefresh(accessToken)
      if (!accessToken) {
        return new Response(null, {
          status: 401,
        })
      }
    } else {
      return new Response(null, {
        status: 401,
      })
    }
  }

  const doFetch = async (jwt: string) => {
    const headers = new Headers(options.headers || {})
    headers.set('Authorization', `JWT ${jwt}`)

    return fetch(input, {
      ...options,
      headers
    })
  }

  let res = await doFetch(accessToken!)

  // Если токен протух, и это первая попытка — обновляем и повторяем
  if (res.status === 401 && options.retry !== false) {
    accessToken = await postTokenRefresh(accessToken)
    if (!accessToken) return res

    res = await doFetch(accessToken)
  }

  return res
}
