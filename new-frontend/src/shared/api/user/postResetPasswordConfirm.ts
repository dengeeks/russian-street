import {USER_RESET_PASSWORD_CONFIRM } from '@/shared/api/endpoints'

export type ResetPasswordConfirmType = {
  new_password: string;
  token: string;
  uid: string;
}

export async function postResetPasswordConfirm(data: ResetPasswordConfirmType) {
  const res = await fetch(USER_RESET_PASSWORD_CONFIRM, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Ошибка при подтверждении сброса пароля');
  }

  return json;
}
