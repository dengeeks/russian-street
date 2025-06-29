import { SUB_DISCIPLINES } from '@/shared/api/endpoints'
import { REVALIDATE_TIME } from '@/shared/settings'
import type { SubDisciplinesType } from './type'

// заглушка при ошибке
const EMPTY_SUB_DISCIPLINES: SubDisciplinesType[] = []

export async function getSubDisciplines(): Promise<SubDisciplinesType[]> {
  try {
    const res = await fetch(SUB_DISCIPLINES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: REVALIDATE_TIME }
    })

    if (!res.ok) {
      return EMPTY_SUB_DISCIPLINES
    }

    return await res.json()
  } catch {
    return EMPTY_SUB_DISCIPLINES
  }
}
