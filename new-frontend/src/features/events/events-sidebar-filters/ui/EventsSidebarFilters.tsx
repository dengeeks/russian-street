'use client'
import styles from "./EventsSidebarFilters.module.css"
import RegionalLeaderCard from '@/entities/regional-leader-card'
import FilterBlock from '@/shared/ui/FilterBlock'
import { useEventFilters } from '@/features/events/hooks/useEventFilters'
import { useMobileDetection } from '@/shared/hooks/useIsMobile'

const EventsSidebarFilters = () => {
  const isMobile = useMobileDetection()

  const {
    locations, setLocations,
    events, setEvents,
    directions, handleDirectionChange,
  } = useEventFilters()

  if (isMobile) return null;

  return (
    <aside className={styles.eventsSidebarAside}>
      <RegionalLeaderCard/>
      <div className={styles.eventsSidebarFilters}>
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
      </div>

    </aside>
  )
}

export default EventsSidebarFilters;