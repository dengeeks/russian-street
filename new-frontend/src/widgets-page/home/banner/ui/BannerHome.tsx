import styles from './BannerHome.module.css'
import Image from 'next/image'
import Button from '@/shared/ui/Button'
import MediaSwitcher from '@/shared/ui/MediaSwitcher'
import JoinOrganizationButton from '@/features/join-organization-button'
import { extractVideoId } from '@/shared/utils/extractVideoId'
import type { PromotionalVideoType } from '@/shared/api/static/home/type'

interface BannerHomeProps {
  promoVideo: PromotionalVideoType;
}

const BannerHome = ({ promoVideo }: BannerHomeProps) => {

  return (
    <section className={styles.bannerContainer}>
      <MediaSwitcher type="video" source={extractVideoId(promoVideo?.video_url || 'Ks0eHBSNFwA')} />

      <div className={`container ${styles.bannerWrapperContent}`}>
        <div className={styles.bannerContent}>
          <div className={styles.bannerLogoWrapper}>
            <Image
              src="/logo-banner.png"
              className={styles.bannerLogo}
              fill
              alt="Улица России"
              priority
              sizes="(min-width: 768px) 576px, 320px"
            />
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
