import { USER_RESET_PASSWORD } from '@/shared/api/endpoints';

export type ResetPasswordRequestType = {
  email: string;
}

export async function postResetPasswordRequest(data: ResetPasswordRequestType) {
  const res = await fetch(USER_RESET_PASSWORD(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return await res.json();
}
