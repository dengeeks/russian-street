import { DOCKER_API_BASE_URL, PUBLIC_API_BASE_URL } from '@/shared/settings'

const API_VERSION_PREFIX = '/api/v1/';

const PUBLIC_API_URL = PUBLIC_API_BASE_URL + API_VERSION_PREFIX;
const DOCKER_API_URL = DOCKER_API_BASE_URL + API_VERSION_PREFIX;

// универсальный конкатенатор
const getApiUrl = (endpoint: string, ssr: boolean = true): string => {
  return (ssr ? DOCKER_API_URL : PUBLIC_API_URL) + endpoint;
};

// Пользователь
export const USER_REGISTRATION = getApiUrl(`user/auth/registration/`, false);

export const USER_LOGIN = getApiUrl(`user/auth/authorization/`, false);

export const USER_GET = (ssr: boolean = false) =>
  getApiUrl(`user/profile/`, ssr);

export const USER_RESET_PASSWORD = getApiUrl(`user/auth/reset-password/`, false);

export const USER_RESET_PASSWORD_CONFIRM = getApiUrl(`user/auth/reset-password/confirm/`, false);

export const USER_TOKEN_REFRESH = (ssr: boolean = true) =>
  getApiUrl(`user/auth/refresh-token/`, ssr);


// Статичные данные

  // Контактные данные
  export const STATIC_CONTACT = (ssr: boolean = true) =>
    getApiUrl(`static/contact/`, ssr);

  // Контактные данные
  export const STATIC_HOME = (ssr: boolean = true) =>
    getApiUrl(`static/homepage/`, ssr);

  export const STATIC_COOPERATION = (ssr: boolean = true) =>
    getApiUrl(`static/cooperation/`, ssr);

  export const STATIC_EVERYONE_LIKES = (ssr: boolean = true) =>
    getApiUrl(`static/everyone-likes/`, ssr);

  export const STATIC_ABOUT_US = (ssr: boolean = true) =>
    getApiUrl(`static/aboutus/`, ssr);
