import { O_AUTH_2 } from '@/shared/api/endpoints'
import { fetchWithAuth } from '@/shared/api/fetchWithAuth'

export type OAuth2Type = {
  response_type: string
  code_challenge: string
  code_challenge_method: string
  client_id: string
  redirect_uri: string
  scope: string
}

export type PostOAuth2Response = {
  status: number;
  json: {
    error?: {
      error: string;
      description: string;
      status_code: number;
    };
    url?: string;
  } | null;
};

export async function postOAuth2(data: OAuth2Type): Promise<PostOAuth2Response> {
  const res = await fetchWithAuth(O_AUTH_2, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const json = await res.json().catch(() => null);

  return {
    status: res.status,
    json,
  };
}

