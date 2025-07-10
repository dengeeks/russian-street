import styles from './BannerEvent.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import MediaSwitcher from '@/shared/ui/MediaSwitcher'
import ActionButton from '@/features/action-buttons'
import { extractVideoId } from '@/shared/utils/extractVideoId'
import FavoriteToggleButton from '@/features/favorite-toggle'
import { EventOrAreaType, MediaFormatType } from '@/shared/api/type'

interface BannerEventProps extends MediaFormatType {
  title: string
  city?: string
  is_favorite?: boolean
  id?: string
  type?: EventOrAreaType
}

const BannerEvent = ({
  title,
  format_type,
  city,
  image,
  video_url,
  type,
  is_favorite,
  id
}: BannerEventProps) => {
  const hasFavoriteData = type && id && is_favorite !== undefined

  return (
    <section className={`section-spacing-bottom ${styles.eventBanner}`}>
      {hasFavoriteData && (
        <div className={styles.favoriteWrapperMobile}>
          <FavoriteToggleButton initial={is_favorite} type={type!} objectId={id!} />
        </div>
      )}
      <div className={styles.eventBannerWrapper}>
        {format_type === 'image' ? (
          <MediaSwitcher
            type={format_type}
            src={image}
            alt={title}
            sizes="(min-width: 1240px) 1204px, calc(100vw - 32px)"
          />
        ) : (
          <MediaSwitcher type={format_type} source={extractVideoId(video_url || '')} />
        )}
      </div>
      <div className={`container ${styles.eventBannerContainer}`}>
        {hasFavoriteData && (
          <div className={styles.favoriteWrapper}>
            <FavoriteToggleButton initial={is_favorite} type={type!} objectId={id!} />
          </div>
        )}
        <div className={styles.eventBannerContent}>
          {city && <div className={styles.eventBannerLocation}>г. {city}</div>}
          <SectionTitle>{title}</SectionTitle>
          <ActionButton
            type="button"
            modalName="join-organization"
            className={`red ${styles.eventBannerButton}`}
            requireAuth>
            вступить в организацию
          </ActionButton>
        </div>
      </div>
    </section>
  )
}

export default BannerEvent
