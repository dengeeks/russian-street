import styles from './PostCardLarge.module.css'
import MediaSwitcher from '@/shared/ui/MediaSwitcher'
import Icon from '@/shared/icon'

interface PostCardLargeProps {
  city: string
  title: string
  date: string
  media?: string
  views?: number
}

const PostCardLarge = ({ city, title, date, media, views }: PostCardLargeProps) => {
  return (
    <section className={`container ${styles.postCardLarge}`}>
      <div className={styles.postCardLargeHeader}>
        <div className={styles.postCardLargeText}>
          <div className={styles.postCardLargeCity}>{city}</div>
          <div className={styles.postCardLargeTitle}>{title}</div>
        </div>
        <div className={styles.postCardLargeMeta}>
          <span className={styles.postCardLargeDate}>{date}</span>
          {views && (
            <div className={styles.postCardLargeViews}>
              <Icon icon="eye" width={14} height={10} />
              {views} просмотров
            </div>
          )}
        </div>
        <Icon icon="zipper" className={styles.postCardLargeZipper} width={25} height={45} />
      </div>
      {media && (
        <div className={styles.postCardLargeImageWrapper}>
          <MediaSwitcher type="photo" src={media} alt={title} sizes="(min-width: 1240px) 1204px, calc(100vw - 32px)" />
        </div>
      )}
    </section>
  )
}

export default PostCardLarge
