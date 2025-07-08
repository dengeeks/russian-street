import { PARTNERS } from '@/shared/api/endpoints'
import { REVALIDATE_PARTNERS_TIME } from '@/shared/settings'
import type { PartnerListType } from './type'

// заглушка при ошибке
const EMPTY_PARTNERS: PartnerListType = []

export async function getPartners(): Promise<PartnerListType> {
  try {
    const res = await fetch(PARTNERS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: REVALIDATE_PARTNERS_TIME }
    })

    if (!res.ok) {
      return EMPTY_PARTNERS
    }

    return await res.json()
  } catch {
    return EMPTY_PARTNERS
  }
}
