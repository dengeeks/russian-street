import { REGION_MANAGER } from '@/shared/api/endpoints'
import { RegionManagerType } from '@/shared/api/region/region-manager/type'

// заглушка при ошибке
export const EMPTY_REGION_MANAGER: RegionManagerType = {
    uuid: 'string',
    email: 'string',
    first_name: 'string',
    last_name: null,
    phone_number: null,
    avatar: null,
    address: null,
    social_links: []
};

export async function getRegionManager(region_id: string): Promise<RegionManagerType> {
  try {
    const res = await fetch(`${REGION_MANAGER}?region_id=${region_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return EMPTY_REGION_MANAGER;
    }

    return await res.json();
  } catch {
    return EMPTY_REGION_MANAGER;
  }
}
