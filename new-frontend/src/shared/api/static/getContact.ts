import { STATIC_CONTACT } from '@/shared/api/endpoints'
import { REVALIDATE_TIME } from '@/shared/settings'

export type ContactType = {
  contact_footer: {
    url: string;
    image: string;
  }[];
  contact_header: {
    youtube: string;
    telegram: string;
    vkontakte: string;
  } | null;
  email_footer: {
    email: string;
  } | null;
}

// заглушка при ошибке
const EMPTY_CONTACT: ContactType = {
  contact_footer: [],
  contact_header: null,
  email_footer: null,
};

export async function getContact(): Promise<ContactType> {
  try {
    const res = await fetch(STATIC_CONTACT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'force-cache',
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!res.ok) {
      return EMPTY_CONTACT;
    }

    return await res.json();
  } catch {
    return EMPTY_CONTACT;
  }
}
