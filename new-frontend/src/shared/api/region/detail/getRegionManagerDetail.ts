import { REGION_MANAGER_DETAIL } from '@/shared/api/endpoints'
import type { RegionManagerDetailType } from './type'

export const EMPTY_EVENT_OR_AREA_DETAIL: RegionManagerDetailType = {
  id: '',
  name: '',
  code: '',
  image: '',
  info: '',
  manager: {
    uuid: '',
    email: '',
    first_name: '',
    last_name: null,
    phone_number: null,
    avatar: null,
    address: null,
    social_links: [],
    info: ''
  }
}

export async function getRegionManagerDetail(slug: string): Promise<RegionManagerDetailType | 404> {
  try {
    const res = await fetch(REGION_MANAGER_DETAIL(slug), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    if (!res.ok) return 404

    return res.json()
  } catch {
    return EMPTY_EVENT_OR_AREA_DETAIL
  }
}
