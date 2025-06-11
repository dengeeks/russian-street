import { USER_LOGIN } from '@/shared/api/endpoints';
import { saveTokenAction } from '@/shared/server-action/saveTokenAction'

export type LoginType = {
  email: string;
  password: string;
}

export async function postLogin(data: LoginType) {
  const res = await fetch(USER_LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  const { access, refresh } = json;

  if (access && refresh) {
    await saveTokenAction({access, refresh});
  }

  if (!res.ok) {
    throw Object.assign(new Error('Неверный email или пароль.'), {
      response: { data: { detail: 'Неверный email или пароль.' } }
    });
  }

  return json;
}
