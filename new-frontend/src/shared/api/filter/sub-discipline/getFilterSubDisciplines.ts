import {FILTER_SUB_DISCIPLINES } from '@/shared/api/endpoints'
import type { FilterSubDisciplinesType, SubDisciplinesFilterType } from './type'
import { buildQueryString } from '@/shared/utils/buildQueryString'

// заглушка при ошибке
export const EMPTY_FILTER_SUB_DISCIPLINES: FilterSubDisciplinesType[] = []

export async function getFilterSubDisciplines(params: SubDisciplinesFilterType): Promise<FilterSubDisciplinesType[]> {
  const queryString = buildQueryString(params)
  try {
    const res = await fetch(`${FILTER_SUB_DISCIPLINES}?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    if (!res.ok) {
      return EMPTY_FILTER_SUB_DISCIPLINES
    }

    return await res.json()
  } catch {
    return EMPTY_FILTER_SUB_DISCIPLINES
  }
}
