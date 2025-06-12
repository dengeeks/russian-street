'use server'
// server action
import { USER_TOKEN_REFRESH } from '@/shared/api/endpoints';
import { removeTokens } from '@/shared/server-action/removeTokens'
import { saveTokenAction } from '@/shared/server-action/saveTokenAction'
import { getAccessAction, getRefreshAction } from '@/shared/server-action/getTokenAction'

export async function postTokenRefresh(): Promise<string | null> {
  const accessToken = await getAccessAction()
  const refreshToken = await getRefreshAction()

  if (!refreshToken && accessToken) {
    await removeTokens()
    return null
  }

  const res = await fetch(USER_TOKEN_REFRESH(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      {
        refresh: refreshToken
      }
    ),
  });


  if (!res.ok) {
    await removeTokens()
    return null;
  }

  const json = await res.json();
  const { access } = json;

  if (access) {
    await saveTokenAction({ access })

  }
  return access;
}
