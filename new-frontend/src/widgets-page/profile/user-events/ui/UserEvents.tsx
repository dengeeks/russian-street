'use client'
import styles from './UserEvents.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import FavoriteAndParticipated from './FavoriteAndParticipated'
import ProfileEventCard from '@/entities/profile/profile-Event-card'

const UserEvents = () => {
  return (
    <section className={`container section-spacing-top ${styles.userEventsSection}`}>
      <SectionTitle>Мероприятия</SectionTitle>
      <div className={styles.userEventsList}>
        <ProfileEventCard />
        <ProfileEventCard />
      </div>
      <FavoriteAndParticipated />
    </section>
  )
}

export default UserEvents
