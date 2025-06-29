import { DISCIPLINES } from '@/shared/api/endpoints'
import { REVALIDATE_TIME } from '@/shared/settings'
import type { DisciplinesType } from './type'

// заглушка при ошибке
const EMPTY_DISCIPLINES: DisciplinesType[] = []

export async function getDisciplines(): Promise<DisciplinesType[]> {
  try {
    const res = await fetch(DISCIPLINES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: REVALIDATE_TIME }
    })

    if (!res.ok) {
      return EMPTY_DISCIPLINES
    }

    return await res.json()
  } catch {
    return EMPTY_DISCIPLINES
  }
}
