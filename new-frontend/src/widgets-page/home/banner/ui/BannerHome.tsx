import styles from './BannerHome.module.css'
import Image from 'next/image'
import Button from '@/shared/ui/Button'
import MediaSwitcher from '@/shared/ui/MediaSwitcher'
import JoinOrganizationButton from '@/features/join-organization-button'

const BannerHome = () => {
  return (
    <section className={styles.bannerContainer}>
      <MediaSwitcher
        type="video"
        src="https://www.youtube.com/embed/Ks0eHBSNFwA?si=feeupCeDCfAKIX3p&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=Ks0eHBSNFwA"
        title="YouTube video player"
      />

      <div className={`container ${styles.bannerWrapperContent}`}>
        <div className={styles.bannerContent}>
          <div className={styles.bannerLogoWrapper}>
            <Image src="/logo-banner.png" className={styles.bannerLogo} fill alt="Улица России" priority sizes="(min-width: 768px) 576px, 320px" />
          </div>
          <h1>общероссийская общественная организация уличной культуры и спорта</h1>
          <div className={styles.bannerWrapperButton}>
            <JoinOrganizationButton>Участвовать</JoinOrganizationButton>
            <Button type="button" className={`gray ${styles.bannerWrapperButtonDesktop}`}>
              поддержать организацию
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BannerHome
