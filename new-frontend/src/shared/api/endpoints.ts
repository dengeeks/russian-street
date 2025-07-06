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

  export const STATIC_HOME = getApiUrl(`static/homepage/`, true);

  export const STATIC_COOPERATION = getApiUrl(`static/cooperation/`, true);

  export const STATIC_EVERYONE_LIKES = getApiUrl(`static/everyone-likes/`, true);

  export const STATIC_ABOUT_US = getApiUrl(`static/aboutus/`, true);


export const O_AUTH_2 = getApiUrl(`o/authorize/`, false);

export const PARTNERS = getApiUrl('list/partner/', true);

export const TEAM = getApiUrl('list/team_member/', false);

// направления
  export const DISCIPLINES = getApiUrl('info/disciplines/', true)

  export const SUB_DISCIPLINES = getApiUrl('list/subdiscipline/', false);

  // детали направлений
  export const DETAIL_DISCIPLINE = (slug: string) => getApiUrl(`detail/subdiscipline/${slug}`, true);

// мероприятия
  export const EVENT_OR_AREA_LIST = getApiUrl('list/event-or-area/', false);
  export const EVENT_OR_AREA_DETAIL = (id: string) => getApiUrl(`detail/event-or-area/${id}`, true);
  export const EVENT_OR_AREA_TYPES_CATALOG = getApiUrl(`list/type/event-or-area`, false);

  // короткий список мероприятий в главной странице
  export const EVENT_OR_AREA_HOME_LIST = getApiUrl(`list/short/event-or-area/`, false);

  // добавление и удаление избранные мероприятий
  export const EVENT_ADD_DELETE_FAVORITE = getApiUrl('add-delete/events/', false);


// фильтры
  export const FILTER_REGION = getApiUrl('filter/region/', false);
  export const FILTER_SUB_DISCIPLINES= getApiUrl('filter/subdiscipline/', false);

// регион
  export const REGION_MANAGER = getApiUrl('region-manager/card/', false);


export const MAP_REGION_LIST = getApiUrl('list/map-region/', false);

// блог - новости
  export const BLOG_LIST = getApiUrl('list/new/', false);
  export const BLOG_DETAIL = (id: string) => getApiUrl(`detail/new/${id}`, false);



// заявка
export const FEEDBACK_QUESTION = getApiUrl(`feedback/question/`, false);

export const FEEDBACK_ORGANIZATION = getApiUrl(`feedback/organization/`, false);
