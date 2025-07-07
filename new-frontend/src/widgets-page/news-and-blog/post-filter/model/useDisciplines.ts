import { useCallback, useEffect, useState } from 'react'

import { EMPTY_SUB_DISCIPLINES, getSubDisciplines } from '@/shared/api/direction/sub-disciplines/getSubDisciplines'
import type { SubDisciplinesType} from '@/shared/api/direction/sub-disciplines/type'

export function useDisciplines() {
  const [disciplines, setDisciplines] = useState<SubDisciplinesType[]>(EMPTY_SUB_DISCIPLINES)

  const fetchDisciplines = useCallback(async () => {
    const data = await getSubDisciplines()
    setDisciplines(data)
  }, [])

  useEffect(() => {
    void fetchDisciplines()
  }, [fetchDisciplines])

  return { disciplines }
}
