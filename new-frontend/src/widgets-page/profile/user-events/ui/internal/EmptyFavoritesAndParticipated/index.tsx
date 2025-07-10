import styles from './EmptyFavoritesAndParticipated.module.css'
import Image from 'next/image'
import Link from 'next/link'
import type { EventOrAreaType } from '@/shared/api/type'

interface EmptyFavoritesAndParticipatedProps {
  text: string;
  type: EventOrAreaType;
}

const EmptyFavoritesAndParticipated = ({text, type}: EmptyFavoritesAndParticipatedProps) => {
  return (
    <div className={styles.emptyWrapper}>
      <Image
        src="/assets/webp/mock/empty.webp"
        alt="Иллюстрация пустого списка мероприятий"
        width={377}
        height={220}
        unoptimized
        className={styles.emptyImage}
      />
      <p className={styles.emptyText}>
        Ты пока не {text}, переходи в раздел мероприятий и найди, что тебе нравится.
      </p>
      <Link href={`/events?type=${type}`} className={`red button white ${styles.emptyLink}`}>
        Перейти в {type === 'event' ? 'мероприятия' : 'площадки'}
      </Link>
    </div>
  )
}

export default EmptyFavoritesAndParticipated
