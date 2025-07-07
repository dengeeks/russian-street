import styles from './EventCard.module.css'
import type { EventOrAreaHomeListType } from '@/shared/api/event-or-area/home-list/type'
import Link from 'next/link'

interface EventsCardProps extends EventOrAreaHomeListType{
  type: 'event' | 'area'
}

const EventsCard = ({title, id, city, address, starting_date, type}: EventsCardProps) => {
  return (
      <Link href={`/events/${id}?type=${type}`} className={styles.item}>
        <span className={styles.city}>{city}</span>
        <div className={styles.details}>
          <p className={styles.detail}>{title}</p>
          <p className={styles.detail}>{starting_date}</p>
          <p className={styles.detail}>{address}</p>
        </div>
      </Link>
  )
}

export default EventsCard
