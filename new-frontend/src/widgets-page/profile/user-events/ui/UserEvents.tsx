'use client'
import styles from './UserEvents.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import FavoriteAndParticipated from './internal/FavoriteAndParticipated'
import ProfileEventCard from '@/entities/profile/profile-Event-card'
import { useUserRegionFilteredEventList } from '../model/useUserRegionFilteredEventList'


const UserEvents = () => {
  const { eventList } = useUserRegionFilteredEventList()

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
