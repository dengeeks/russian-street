import { useCallback, useEffect, useState } from 'react'
import { EMPTY_EVENT_OR_AREA_LIST, getEventOrAreaList } from '@/shared/api/event-or-area/list/getEventOrAreaList'
import type { EventOrAreaListType } from '@/shared/api/event-or-area/list/type'

export function useEventList() {
  const [eventList, setEventList] = useState<EventOrAreaListType>(EMPTY_EVENT_OR_AREA_LIST)

  const fetchEventList = useCallback(async () => {
    const data = await getEventOrAreaList({type: 'event', page_size: 2})
    setEventList(data)
  }, [setEventList])

  useEffect(() => {
    void fetchEventList()
  }, [fetchEventList])

  return eventList.results;
}
