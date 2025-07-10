import { useCallback, useEffect, useMemo, useState } from 'react'
import { EMPTY_EVENT_OR_AREA_LIST, getEventOrAreaList } from '@/shared/api/event-or-area/list/getEventOrAreaList'
import type { EventOrAreaListType, EventFilterType } from '@/shared/api/event-or-area/list/type'

export type EventListFilterType = EventFilterType &{
  only_our_projects: boolean;
}

const DEFAULT_FILTER: Partial<EventFilterType> = {
  page: 1,
  type: 'event',
}

export function useEventList(filter: EventListFilterType | EventFilterType) {
  const [eventList, setEventList] = useState<EventOrAreaListType>(EMPTY_EVENT_OR_AREA_LIST)
  const [isLoading, setIsLoading] = useState(true)

  const mergedFilter = useMemo(() => {
    return {
      ...DEFAULT_FILTER,
      ...filter,
    } as EventFilterType
  }, [filter])


  const fetchEventList = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await getEventOrAreaList(mergedFilter)
      setEventList(data)
    } finally {
      setIsLoading(false)
    }
  }, [mergedFilter]);


  useEffect(() => {
    void fetchEventList()
  }, [fetchEventList])

  return {isLoading, eventList};
}

