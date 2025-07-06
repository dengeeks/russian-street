import { useCallback, useEffect, useState } from 'react'

import type { EventOrAreaHomeListType } from '@/shared/api/event-or-area/home-list/type'
import { getEventOrAreaList, EMPTY_EVENT_OR_AREA_HOME_LIST } from '@/shared/api/event-or-area/home-list/getEventOrAreaHomeList'

export function useHomeEventsList(type: 'event' | 'area', region_id?: string) {
  const [homeEventsList, setHomeEventsList] = useState<EventOrAreaHomeListType[]>(EMPTY_EVENT_OR_AREA_HOME_LIST)

  const fetchHomeEventsList = useCallback(async () => {
    const data = await getEventOrAreaList({type, region_id})
    setHomeEventsList(data)
  }, [type, region_id])

  useEffect(() => {
    void fetchHomeEventsList()
  }, [fetchHomeEventsList])

  return { homeEventsList }
}
