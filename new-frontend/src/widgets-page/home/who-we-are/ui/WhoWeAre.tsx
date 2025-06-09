'use client'
import styles from './WhoWeAre.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import MetricsBlock from './MetricsBlock'
import Link from 'next/link'
import Image from 'next/image'
import { useHomeData } from '@/shared/context/home-data/useHomeDataContext'
import { getImageUrl } from '@/shared/utils/getImageUrl'

const WhoWeAre = () => {
  const {homeData: {mission_and_goals_text, mission_images}} = useHomeData();

  const imagesToRender = mission_images.length
    ? [...mission_images].sort((a, b) => a.order - b.order)
    : new Array(4).fill({ image: null, order: 0 });

  return (
    <section className={styles.whoWeAre}>
      <div className="container">
        <SectionTitle>кто мы</SectionTitle>
      </div>
      <MetricsBlock />

      <div className={`container ${styles.whoWeAre__content}`}>
        <div className={styles.whoWeAre__text}>
          <div className={styles.whoWeAre__textBlock}>
            <h3 className={styles.whoWeAre__textBlock_h3}>Миссия</h3>
            <p className={styles.whoWeAre__textBlock_p}>
              {mission_and_goals_text?.mission || '...'}
            </p>
          </div>
          <div className={styles.whoWeAre__textBlock}>
            <h3 className={styles.whoWeAre__textBlock_h3}>Цели</h3>
            <p className={styles.whoWeAre__textBlock_p}>
              {mission_and_goals_text?.goal || '...'}
            </p>
          </div>
          <Link href="/about-us" className="more-link" aria-label="подробнее">
            подробнее
          </Link>
        </div>

        <div className={styles.whoWeAre__photoGrid}>
          {imagesToRender.map((mission, index) => (
            <div
              key={mission.order + index}
              className={`${styles.imgWrapper} ${styles[`img${index + 1}`]}`}
            >
              <Image
                src={getImageUrl(mission.image)}
                fill
                alt={`Миссия ${index + 1}`}
                className={styles.imgWrapperImg}
                sizes="(min-width: 1024px) 286px, (min-width: 900px) 240px, (min-width: 800px) 200px, (min-width: 768px) 180px, calc(50vw - 16px)"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhoWeAre
