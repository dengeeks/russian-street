'use client'
import styles from "./EventsSidebarFilters.module.css"
import { useMobileDetection } from '@/shared/hooks/useIsMobile'
import { useEventsData } from '@/shared/context/events/useEventsDataContext'
import EventsFilterBlocks from '@/features/events/events-filters/internal/EventsFilterBlocks'
import RegionalLeaderCard from '@/entities/regional-leader-card'


const EventsSidebarFilters = () => {
  const isMobile = useMobileDetection()

  const {eventFilter, eventsData} = useEventsData()
  const {region_id} = eventFilter;

  if (isMobile || eventsData.results.length === 0) return null;

  return (
    <aside className={styles.eventsSidebarAside}>
      {region_id && (<RegionalLeaderCard region_id={region_id}/>)}
      <div className={styles.eventsSidebarFilters}>
        <EventsFilterBlocks/>
      </div>

    </aside>
  )
}

export default EventsSidebarFilters;