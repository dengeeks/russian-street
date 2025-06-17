'use client'
import styles from './EventsSelectFilters.module.css'
import SelectMenu from '@/shared/ui/SelectMenu'
import { useMobileDetection } from '@/shared/hooks/useIsMobile'
import dynamic from 'next/dynamic'
import Loader from '@/shared/ui/Loader'

const EventsFilterMobile = dynamic(() => import('./EventsFilterMobile'), {
  loading: () => (<Loader/>),
});

const EventsSelectFilters = () => {
  const isMobile = useMobileDetection()
  return (
    <div className={`container ${styles.eventsSelectFilters}`}>
      <SelectMenu placeholder="Выбрать регион" options={['dawdaw', 'awdawdaw']} />
      {isMobile ? (
        <EventsFilterMobile />
      ) : (
        <>
          <SelectMenu placeholder="Город" options={['dawdaw', 'awdawdaw']} />
          <SelectMenu placeholder="Направление" options={['dawdaw', 'awdawdaw']} />
          <SelectMenu placeholder="Сначала популярные" options={['dawdaw', 'awdawdaw']} />
        </>
      )}
    </div>
  )
}

export default EventsSelectFilters
