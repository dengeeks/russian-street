import { getAccessAction, getRefreshAction } from '@/shared/server-action/getTokenAction'
import { postTokenRefresh } from '@/shared/api/user/postTokenRefresh'

type FetchOptions = RequestInit & {
  retry?: boolean;
  requireAuth?: boolean;
};

let cachedAccessTokenForGuest: string | null | undefined = undefined;

export async function fetchWithAuth(input: RequestInfo, options: FetchOptions = {}): Promise<Response> {
  const { requireAuth = true, retry = true, ...fetchOptions } = options;
  let accessToken: string | null = null;

  const addAuthHeader = (token?: string) => {
    const headers = new Headers(fetchOptions.headers || {});
    if (token) headers.set('Authorization', `JWT ${token}`);
    return headers;
  };

  const doFetch = async (token?: string) =>
    fetch(input, {
      ...fetchOptions,
      headers: addAuthHeader(token),
    });

  // --- Авторизованный режим ---
  if (requireAuth) {
    accessToken = await getAccessAction();

    if (!accessToken) {
      const refreshToken = await getRefreshAction();
      if (refreshToken) {
        accessToken = await postTokenRefresh(accessToken);
      }
    }

    if (!accessToken) {
      return new Response(null, { status: 401 }); // Не делаем запрос вообще
    }

    let res = await doFetch(accessToken);

    // Повторная попытка, если access протух
    if (res.status === 401 && retry) {
      accessToken = await postTokenRefresh(accessToken);
      if (!accessToken) return res;

      res = await doFetch(accessToken);
    }

    return res;
  }

  // --- не авторизованный режим (requireAuth: false) ---

  if (!cachedAccessTokenForGuest) {
    cachedAccessTokenForGuest = await getAccessAction();

    if (!cachedAccessTokenForGuest) {
      const refreshToken = await getRefreshAction();
      if (refreshToken) {
        cachedAccessTokenForGuest = await postTokenRefresh(cachedAccessTokenForGuest);
      }
    }
  }

  let res = await doFetch(cachedAccessTokenForGuest || undefined);

  // Если токен был, но запрос с ним дал 401 — пробуем без токена
  if (res.status === 401 && cachedAccessTokenForGuest) {
    res = await doFetch(undefined); // Повторяем без токена
  }

  return res;
}
