import { TEAM } from '@/shared/api/endpoints'
import type { TeamListType } from './type'

// заглушка при ошибке
const EMPTY_TEAM: TeamListType = []

export async function getTeam(): Promise<TeamListType> {
  try {
    const res = await fetch(TEAM, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    if (!res.ok) {
      return EMPTY_TEAM
    }

    return await res.json()
  } catch {
    return EMPTY_TEAM
  }
}
