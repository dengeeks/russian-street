'use client'
import FilterBlock from '@/shared/ui/FilterBlock'
import { useEventsData } from '@/shared/context/events/useEventsDataContext'
import {useEventTypesCatalog } from '@/features/events/hooks/useEventTypesCatalog'

const EventsFilterBlocks = () => {
  const { eventFilter, onFilterChange, directions } = useEventsData()
  const { categories } = useEventTypesCatalog(eventFilter.type)

  return (
    <>
      <FilterBlock
        title={eventFilter.type === 'event' ? 'Мероприятия' : 'Площадки'}
        items={categories}
        selectedIds={eventFilter.type_ids?.split(',') ?? []}
        onChange={newIds => onFilterChange('type_ids', newIds.filter(Boolean).join(','))}
        showToggleAll
      />

      {directions.map(({ discipline, subdisciplines }) => (
        <FilterBlock
          key={discipline.id}
          title={discipline.name}
          items={subdisciplines}
          selectedIds={eventFilter.subdiscipline_ids?.split(',') ?? []}
          onChange={newIds => onFilterChange('subdiscipline_ids', newIds.filter(Boolean).join(','))}
          showToggleAll
        />
      ))}
    </>
  )
}

export default EventsFilterBlocks
