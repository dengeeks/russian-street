'use client'
import styles from './UserEvents.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import FavoriteAndParticipated from './internal/FavoriteAndParticipated'
import { useEventList } from '@/widgets-page/profile/user-events/model/useEventList'
import ProfileEventCard from '@/entities/profile/profile-Event-card'

const UserEvents = () => {
  const eventList = useEventList()
  return (
    <section className={`container section-spacing-top section-spacing-bottom ${styles.userEventsSection}`}>
        <SectionTitle>Мероприятия</SectionTitle>
      <div className={styles.userEventsList}>
        {eventList.map(event => (
          <ProfileEventCard key={event.id} {...event} />
        ))}
      </div>
      <FavoriteAndParticipated />
    </section>
  )
}

export default UserEvents
