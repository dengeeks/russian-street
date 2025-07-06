import { FEEDBACK_ORGANIZATION } from '@/shared/api/endpoints';
import { fetchWithAuth } from '@/shared/api/fetchWithAuth'
import { formatDateToIso } from '@/shared/utils/formatDate'

export type JoinOrganizationType = {
  // Личные данные
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: 'Мужской' | 'Женский';
  region_id: string;
  city_id: string;
  social: string;

  // Паспортные данные
  passport_series: string;
  passport_number: string;
  passport_issue_date: string;
  passport_issuer: string;

  // Согласия
  memberRightsAgreement: boolean;
  agreement: boolean;
}

type OrganizationPayload = Omit<JoinOrganizationType, 'agreement' | 'memberRightsAgreement'>

export async function postFeedbackOrganization(data: OrganizationPayload) {
  const formattedData = {
    ...data,
    date_of_birth: formatDateToIso(data.date_of_birth),
    passport_issue_date: formatDateToIso(data.passport_issue_date),
  };
  const res = await fetchWithAuth(FEEDBACK_ORGANIZATION, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formattedData),
  });

  const json = await res.json();

  return {
    status: res.status,
    data: json,
  };
}
