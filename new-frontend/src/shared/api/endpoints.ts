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

export const USER_UPDATE = getApiUrl(`user/update/`, false);


// Статичные данные

  // Контактные данные
  export const STATIC_CONTACT = getApiUrl(`static/contact/`, true);

  // Контактные данные
  export const STATIC_HOME = getApiUrl(`static/homepage/`, true);

  export const STATIC_COOPERATION = getApiUrl(`static/cooperation/`, true);

  export const STATIC_EVERYONE_LIKES = getApiUrl(`static/everyone-likes/`, true);

  export const STATIC_ABOUT_US = getApiUrl(`static/aboutus/`, true);


export const O_AUTH_2 = getApiUrl(`o/authorize/`, false);

export const PARTNERS = getApiUrl('list/partner/', true);