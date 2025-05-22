import styles from './Banner.module.css';
import Button from '@/shared/ui/Button';
import Image from 'next/image';
import SectionTitle from '@/shared/ui/SectionTitle';
import MediaSwitcher from '@/shared/ui/MediaSwitcher';

const Banner = () => {
  return (
    <section className={styles.bannerAbout}>
      <div className={styles.bannerAboutContent}>
        <div className={styles.bannerAboutArrows}>
          <Image src="/png/about-us-arrow.png" alt="стрелки" width={74} height={68} />
          <Image src="/png/about-us-arrow.png" alt="стрелки" width={74} height={68} />
          <Image src="/png/about-us-arrow.png" alt="стрелки" width={74} height={68} />
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
      </div>
    </section>
  );
};

export default Banner;
