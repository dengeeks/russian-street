import styles from './WhoWeAre.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import MetricsBlock from './MetricsBlock'
import Link from 'next/link'
import Image from 'next/image'

const WhoWeAre = () => {
  return (
    <section className={`${styles.whoWeAre} section-spacing-top`}>
      <div className="container">
        <SectionTitle>кто мы</SectionTitle>
      </div>

      <MetricsBlock />

      <div className={`container ${styles.whoWeAre__content}`}>
        <div className={styles.whoWeAre__text}>
          <div className={styles.whoWeAre__textBlock}>
            <h3 className={styles.whoWeAre__textBlock_h3}>Миссия</h3>
            <p className={styles.whoWeAre__textBlock_p}>
              Создать условия для успешной реализации потенциала каждого связанного с уличными дисциплинами и
              духовной профессиональный сфере
            </p>
          </div>
          <div className={styles.whoWeAre__textBlock}>
            <h3 className={styles.whoWeAre__textBlock_h3}>Цели</h3>
            <p className={styles.whoWeAre__textBlock_p}>
              Комплексное развитие уличной культуры и спорта. Популяризация уличных дисциплин. Создание положительного
              образа в информационном пространстве у дисциплин, которые считаются травмоопасными и агрессивными.
            </p>
          </div>
          <Link href="/" className="more-link" aria-label="подробнее">
            подробнее
          </Link>
        </div>

        <div className={styles.whoWeAre__photoGrid}>
          <div className={`${styles.imgWrapper} ${styles.img1}`}>
            <Image src="/test/whoweare1.png" fill alt="" className={styles.imgWrapperImg} sizes="(min-width: 1024px) 286px, (min-width: 900px) 240px, (min-width: 800px) 200px, (min-width: 768px) 180px, calc(50vw - 16px)"/>
          </div>
          <div className={`${styles.imgWrapper} ${styles.img2}`}>
            <Image src="/test/whoweare2.png" fill alt="" className={styles.imgWrapperImg} sizes="(min-width: 1024px) 286px, (min-width: 900px) 240px, (min-width: 800px) 200px, (min-width: 768px) 180px, calc(50vw - 16px)"/>
          </div>
          <div className={`${styles.imgWrapper} ${styles.img3}`}>
            <Image src="/test/whoweare3.png" fill alt="" className={styles.imgWrapperImg} sizes="(min-width: 1024px) 286px, (min-width: 900px) 240px, (min-width: 800px) 200px, (min-width: 768px) 180px, calc(50vw - 16px)" />
          </div>
          <div className={`${styles.imgWrapper} ${styles.img4}`}>
            <Image src="/test/whoweare4.png" fill alt="" className={styles.imgWrapperImg} sizes="(min-width: 1024px) 286px, (min-width: 900px) 240px, (min-width: 800px) 200px, (min-width: 768px) 180px, calc(50vw - 16px)" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhoWeAre
