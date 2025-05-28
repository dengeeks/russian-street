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
          src="https://www.youtube.com/embed/Ks0eHBSNFwA?si=feeupCeDCfAKIX3p&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=Ks0eHBSNFwA"
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
