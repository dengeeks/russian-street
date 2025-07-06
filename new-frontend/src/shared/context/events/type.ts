import type { EventFilterType, EventOrAreaListType } from '@/shared/api/event-or-area/list/type'
import { FilterSubDisciplinesType } from '@/shared/api/filter/sub-discipline/type'

export type EventsDataContextType = {
  eventsData: EventOrAreaListType;
  eventFilter: EventFilterType;
  onFilterChange: <K extends keyof EventFilterType>(key: K, value: EventFilterType[K]) => void;
  directions: FilterSubDisciplinesType[];
  isLoading: boolean
};