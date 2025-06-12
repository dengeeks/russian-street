import styles from './BannerEvent.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import MediaSwitcher from '@/shared/ui/MediaSwitcher'
import ActionButton from '@/features/action-buttons'

const BannerEvent = () => {
  return (
    <section className={`section-spacing-bottom ${styles.eventBanner}`}>
      <div className={styles.eventBannerWrapper}>
        <MediaSwitcher
          type="video"
          source={{type: 'youtube', id: 'Ks0eHBSNFwA'}}
        />
      </div>
      <div className={`container ${styles.eventBannerContent}`}>
        <div className={styles.eventBannerLocation}>г. Кемерово</div>
        <SectionTitle>Соревнования по скейтбордингу</SectionTitle>
        <ActionButton type="button" modalName="join-organization" className={`red ${styles.eventBannerButton}`} requireAuth>
          Участвовать
        </ActionButton>
      </div>
    </section>
  )
}

export default BannerEvent
