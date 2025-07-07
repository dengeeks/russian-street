'use client'
import styles from './UserEvents.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import FavoriteAndParticipated from './internal/FavoriteAndParticipated'
import { useEventList } from '@/shared/hooks/useEventList'
import ProfileEventCard from '@/entities/profile/profile-Event-card'
import { useGlobalData } from '@/shared/context/global-data/useGlobalDataContext'
import { useMemo } from 'react'
import { EventOrAreaType } from '@/shared/api/type'

const UserEvents = () => {
  const {userData} = useGlobalData()

  const EventFilter = useMemo(() => {
    const filter = {
      type: 'event' as EventOrAreaType,
      page_size: 2,
    }
    if (userData?.region?.id) {
      return {
        ...filter,
        region_id: userData.region.id,
      }
    }
    return filter
  }, [userData?.region?.id])

  const { eventList } = useEventList(EventFilter)

  return (
    <section className={`container section-spacing-top section-spacing-bottom ${styles.userEventsSection}`}>
        <SectionTitle>Мероприятия</SectionTitle>
      <div className={styles.userEventsList}>
        {eventList.results.map(event => (
          <ProfileEventCard key={event.id} {...event} />
        ))}
      </div>
      <FavoriteAndParticipated />
    </section>
  )
}

export default UserEvents
