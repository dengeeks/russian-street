import { useCallback, useEffect, useState } from 'react'
import { getEventOrAreaList, EMPTY_EVENT_OR_AREA_LIST } from '@/shared/api/event-or-area/list/getEventOrAreaList';
import type { EventFilterType, EventOrAreaListType } from '@/shared/api/event-or-area/list/type';

export function useEventsData(filter: EventFilterType) {
  const [eventsData, setEventsData] = useState<EventOrAreaListType>(EMPTY_EVENT_OR_AREA_LIST);
  const [isLoading, setIsLoading] = useState(true)
  
  const fetchEvents = useCallback(async () => {
    setIsLoading(false)
    try {
      const data = await getEventOrAreaList(filter)
      setEventsData(data)
    } finally {
      setIsLoading(false)
    }
    const data = await getEventOrAreaList(filter);
    setEventsData(data);
  }, [filter]);
  

  useEffect(() => {
    void fetchEvents();
  }, [fetchEvents]);

  return { eventsData, isLoading }
}
