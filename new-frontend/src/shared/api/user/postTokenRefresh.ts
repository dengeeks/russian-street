'use server'
// server action
import { USER_TOKEN_REFRESH } from '@/shared/api/endpoints';
import { removeTokens } from '@/shared/server-action/removeTokens'
import { saveTokenAction } from '@/shared/server-action/saveTokenAction'
import {getRefreshAction } from '@/shared/server-action/getTokenAction'

export async function postTokenRefresh(accessToken: string | null): Promise<string | null> {
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
