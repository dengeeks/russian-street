'use client'
import { useEventsData } from '@/shared/context/events/useEventsDataContext'
import SelectFilters from '@/features/filter-select'
import EventsFilterBlocks from '../internal/EventsFilterBlocks'


const EventsSelectFilters = () => {
  const {onFilterChange, eventFilter, directions} = useEventsData()

  const filter = {
    region_id: eventFilter.region_id,
    city_id: eventFilter.city_id,
    sort: eventFilter.sort,
    subdiscipline_ids: eventFilter.subdiscipline_ids,
  }
  return (
    <SelectFilters directions={directions.flatMap(({ subdisciplines }) => subdisciplines)} filter={filter} onFilterChange={onFilterChange}>
      <EventsFilterBlocks/>
    </SelectFilters>
  )
}

export default EventsSelectFilters
