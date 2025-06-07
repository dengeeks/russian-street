import { DOCKER_API_BASE_URL, PUBLIC_API_BASE_URL } from '@/shared/settings'

const API_VERSION_PREFIX = '/api/v1/';

const PUBLIC_API_URL = PUBLIC_API_BASE_URL + API_VERSION_PREFIX;
const DOCKER_API_URL = DOCKER_API_BASE_URL + API_VERSION_PREFIX;

// универсальный конкатенатор
const getApiUrl = (endpoint: string, ssr: boolean = true): string => {
  return (ssr ? DOCKER_API_URL : PUBLIC_API_URL) + endpoint;
};

// Пользователь
export const USER_REGISTRATION = (ssr: boolean = false) =>
  getApiUrl(`user/auth/registration/`, ssr);

export const USER_LOGIN = (ssr: boolean = false) =>
  getApiUrl(`user/auth/authorization/`, ssr);

export const USER_GET = (ssr: boolean = false) =>
  getApiUrl(`user/profile/`, ssr);

export const USER_RESET_PASSWORD = (ssr: boolean = false) =>
  getApiUrl(`user/auth/reset-password/`, ssr);

export const USER_RESET_PASSWORD_CONFIRM = (ssr: boolean = false) =>
  getApiUrl(`user/auth/reset-password/confirm/`, ssr);

export const USER_TOKEN_REFRESH = (ssr: boolean = false) =>
  getApiUrl(`user/auth/refresh-token/`, ssr);
