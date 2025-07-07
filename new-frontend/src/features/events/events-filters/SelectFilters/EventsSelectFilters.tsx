'use client'
import { useEventsData } from '@/shared/context/events/useEventsDataContext'
import SelectFilters from '@/features/filter-select'
import EventsFilterBlocks from '../internal/EventsFilterBlocks'


const EventsSelectFilters = () => {
  const {onFilterChange, eventFilter, directions} = useEventsData()

  return (
    <SelectFilters directions={directions.flatMap(({ subdisciplines }) => subdisciplines)} filter={{region_id: eventFilter.region_id, subdiscipline_ids: eventFilter.subdiscipline_ids, sort: eventFilter.sort, city_id: eventFilter.city_id}} onFilterChange={onFilterChange}>
      <EventsFilterBlocks/>
    </SelectFilters>
  )
}

export default EventsSelectFilters
