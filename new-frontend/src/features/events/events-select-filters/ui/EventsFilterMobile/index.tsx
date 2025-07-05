'use client'
import styles from './EventsFilterMobile.module.css'
import MobileFilterModal from '@/shared/ui/MobileFilterModal'
import SelectMenu from '@/shared/ui/SelectMenu'
import { useState } from 'react'
import FilterBlock from '@/shared/ui/FilterBlock'
import Icon from '@/shared/icon'
import { useBodyScrollLock } from '@/shared/hooks/useBodyScrollLock'
import { useEventFilters } from '@/features/events/hooks/useEventFilters'

const EventsFilterMobile = () => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    locations, setLocations,
    events, setEvents,
    directions, handleDirectionChange,
    resetFilters
  } = useEventFilters()

  const handleReset = () => {
    resetFilters()
  }

  useBodyScrollLock(isOpen)

  return (
    <>
      <button
        className={styles.filterButton}
        onClick={() => setIsOpen(true)}
        aria-label="Открыть фильтр"
        title="Открыть фильтр"
      >
        <Icon icon="filter-mob" width={24} height={24} />
      </button>

      {isOpen && (
        <MobileFilterModal onClose={() => setIsOpen(false)} onReset={handleReset}>
          <SelectMenu placeholder="Город" options={['dawdaw', 'awdawdaw']} />
          <SelectMenu placeholder="Направление" options={['dawdaw', 'awdawdaw']} />
          <SelectMenu placeholder="Сначала популярные" options={['dawdaw', 'awdawdaw']} />
          <FilterBlock
            title="Площадки"
            items={locations}
            onChange={setLocations}
            showToggleAll
          />

          <FilterBlock
            title="Мероприятия"
            items={events}
            onChange={setEvents}
            showToggleAll
          />

          {directions.map(({ category, filters }) => (
            <FilterBlock
              key={category}
              title={category}
              items={filters}
              onChange={(newItems) => handleDirectionChange(category, newItems)}
              showToggleAll
            />
          ))}
        </MobileFilterModal>
      )}
    </>
  )
}

export default EventsFilterMobile
