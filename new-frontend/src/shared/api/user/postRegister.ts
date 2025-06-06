import { USER_REGISTRATION } from '@/shared/api/endpoints';
import { saveTokenAction } from '@/shared/server-action/saveTokenAction'

export type RegisterType = {
  first_name: string;
  email: string;
  password: string;
}

export async function postRegister(data: RegisterType) {
  const res = await fetch(USER_REGISTRATION(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  const { access, refresh } = json;

  if (access && refresh) {
    await saveTokenAction({ access, refresh });
  }

  return json;
}
