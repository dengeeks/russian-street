import styles from './BannerEvent.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import Button from '@/shared/ui/Button'
import MediaSwitcher from '@/shared/ui/MediaSwitcher'

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
        <Button type="button" className={`red ${styles.eventBannerButton}`}>
          Участвовать
        </Button>
      </div>
    </section>
  )
}

export default BannerEvent
