import styles from './Banner.module.css'
import Button from '@/shared/ui/Button'
import Image from 'next/image'
import SectionTitle from '@/shared/ui/SectionTitle'
import MediaSwitcher from '@/shared/ui/MediaSwitcher'
import EditableTextBlock from '@/shared/ui/EditableTextBlock'

const Banner = () => {
  return (
    <section className={styles.bannerAboutWrapper}>
      <div className={`section-spacing-bottom ${styles.bannerAbout}`}>
        <div className={styles.bannerAboutContent}>
          <div className={styles.bannerAboutArrows}>
            <Image src="/png/about-us-arrow.png" alt="стрелки" width={74} height={68} priority />
            <Image src="/png/about-us-arrow.png" alt="стрелки" width={74} height={68} priority />
            <Image src="/png/about-us-arrow.png" alt="стрелки" width={74} height={68} priority />
          </div>
          <SectionTitle>СТАНЬ ЧАСТЬЮ УЛИЦ</SectionTitle>
          <Button type="button">Участвовать</Button>
        </div>

        <div className={styles.bannerAboutVideoWrapper}>
          <MediaSwitcher
            type="video"
            src="https://www.youtube.com/embed/Ks0eHBSNFwA?si=feeupCeDCfAKIX3p&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=Ks0eHBSNFwA"
            title="YouTube video player"
          />
       {/*   <MediaSwitcher*/}
       {/*     type="photo"*/}
       {/*     src="/test/events.png"*/}
       {/*     alt="test photo"*/}
       {/*     sizes="(min-width: 1200px) 800px,*/}
       {/*(min-width: 1150px) 700px,*/}
       {/*(min-width: 1100px) 650px,*/}
       {/*(min-width: 1024px) 570px,*/}
       {/*calc(100vw - 32px)"*/}
       {/*   />*/}
        </div>
      </div>
      <EditableTextBlock
        text="МЫ Родились из уличных дисциплин. Каждый, кто начинал тренироваться на улице,
         <span>находил</span> себе новые знакомства, дружбу, окружение, <span>которое помогало развивать</span> свои сильные стороны. <br/>
         Эта <span>история про</span> пацанов и девчонок, которые воспринимают улицу как свой дом и находят там <span>смысл жизни</span>."
      />
    </section>
  )
}

export default Banner
