import styles from './EmptyFavoritesAndParticipated.module.css'
import Image from 'next/image'
import Link from 'next/link'

interface EmptyFavoritesAndParticipatedProps {
  text: string;
}

const EmptyFavoritesAndParticipated = ({text}: EmptyFavoritesAndParticipatedProps) => {
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
      <Link href="/events" className={`red button white ${styles.emptyLink}`}>
        Перейти в мероприятия
      </Link>
    </div>
  )
}

export default EmptyFavoritesAndParticipated
