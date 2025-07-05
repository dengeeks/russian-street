import styles from './BannerHome.module.css'
import Image from 'next/image'
import MediaSwitcher from '@/shared/ui/MediaSwitcher'
import { extractVideoId } from '@/shared/utils/extractVideoId'
import type { PromotionalVideoType } from '@/shared/api/static/home/type'
import ActionButton from '@/features/action-buttons'

interface BannerHomeProps {
  promoVideo: PromotionalVideoType;
}

const BannerHome = ({ promoVideo }: BannerHomeProps) => {
  return (
    <section className={styles.bannerContainer}>
      <MediaSwitcher type="video_url" source={extractVideoId(promoVideo?.video_url || 'Ks0eHBSNFwA')} />

      <div className={`container ${styles.bannerWrapperContent}`}>
        <div className={styles.bannerContent}>
            <Image
              src="/assets/logo-banner.webp"
              className={styles.bannerLogo}
              width={573}
              height={157}
              alt="Улица России"
              priority
              sizes="(min-width: 768px) 573px, 320px"
            />

          <h1>общероссийская общественная организация уличной культуры и спорта</h1>
          <div className={styles.bannerWrapperButton}>
            <ActionButton type="button" modalName="join-organization" requireAuth>Участвовать</ActionButton>
            <ActionButton type="button" modalName="donating" className={`gray ${styles.bannerWrapperButtonDesktop}`}>поддержать организацию</ActionButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BannerHome
