import styles from './PostCardLarge.module.css'
import MediaSwitcher from '@/shared/ui/MediaSwitcher'
import Icon from '@/shared/icon'
import { formatDateToDDMMYYYY } from '@/shared/utils/formatDate'
import Link from 'next/link'

interface PostCardLargeProps {
  city: string;
  title: string;
  date: string;
  media?: string;
  views?: number;
  id?: string;
}

const PostCardLarge = ({ city, title, date, media, views, id }: PostCardLargeProps) => {
  return (
    <article className={`container ${styles.postCardLarge}`}>
      <div className={styles.postCardLargeHeader}>
        <div className={styles.postCardLargeText}>
          <div className={styles.postCardLargeCity}>{city}</div>
          <Link href={id ? `/blog/${id}` : '#'} className={styles.postCardLargeTitle}>{title}</Link>
        </div>
        <div className={styles.postCardLargeMeta}>
          <span className={styles.postCardLargeDate}>{formatDateToDDMMYYYY(date)}</span>
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
        <Link href={id ? `/blog/${id}` : '#'} className={styles.postCardLargeImageWrapper}>
          <MediaSwitcher type="image" src={media} alt={title} sizes="(min-width: 1240px) 1204px, calc(100vw - 32px)" />
        </Link>
      )}
    </article>
  )
}

export default PostCardLarge
