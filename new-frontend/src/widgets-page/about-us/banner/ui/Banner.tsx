import styles from './Banner.module.css'
import Image from 'next/image'
import SectionTitle from '@/shared/ui/SectionTitle'
import MediaSwitcher from '@/shared/ui/MediaSwitcher'
import EditableTextBlock from '@/shared/ui/EditableTextBlock'
import { JoinStreetType } from '@/shared/api/static/about-us/type'
import { extractVideoId } from '@/shared/utils/extractVideoId'
import ActionButton from '@/features/action-buttons'

interface BannerProps {
  joinStreet: JoinStreetType;
}

const Banner = ({joinStreet}: BannerProps) => {
  return (
    <section className={styles.bannerAboutWrapper}>
      <div className={`section-spacing-bottom ${styles.bannerAbout}`}>
        <div className={styles.bannerAboutContent}>
          <div className={styles.bannerAboutArrows}>
            <Image src="/assets/webp/about-us-arrow.webp" alt="стрелки" width={74} height={68} priority />
            <Image src="/assets/webp/about-us-arrow.webp" alt="стрелки" width={74} height={68} priority />
            <Image src="/assets/webp/about-us-arrow.webp" alt="стрелки" width={74} height={68} priority />
          </div>
          <SectionTitle>СТАНЬ ЧАСТЬЮ УЛИЦ</SectionTitle>
          <ActionButton type="button" modalName="join-organization" requireAuth>Участвовать</ActionButton>
        </div>

        <div className={styles.bannerAboutVideoWrapper}>

          {joinStreet?.video_url ? (
            <MediaSwitcher
              type="video_url"
              source={extractVideoId(joinStreet.video_url)}
            />
          ) : joinStreet?.image ? (
            <MediaSwitcher
              type="image"
              src={joinStreet.image}
              alt="О нас"
              sizes="(min-width: 1200px) 800px,
            (min-width: 1150px) 700px,
            (min-width: 1100px) 650px,
            (min-width: 1024px) 570px,
            calc(100vw - 32px)"
            />
          ) : null}
        </div>
      </div>
      <EditableTextBlock
        text={joinStreet?.text || ''}
      />
    </section>
  )
}

export default Banner
