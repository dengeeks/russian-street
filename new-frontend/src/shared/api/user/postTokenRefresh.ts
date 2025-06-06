import { USER_TOKEN_REFRESH } from '@/shared/api/endpoints';
import { getRefreshAction } from '@/shared/server-action/getTokenAction'
import { saveTokenAction } from '@/shared/server-action/saveTokenAction'
import { removeTokens } from '@/shared/server-action/removeTokens'

export async function postTokenRefresh(): Promise<string | null> {
  const refreshToken = await getRefreshAction()

  if (!refreshToken) {
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

  const json = await res.json();
  const { access } = json;

  if (access) {
    await saveTokenAction({ access: access });
  }
  return access;
}
