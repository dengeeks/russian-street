import styles from './CollaborationIntro.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import EditableTextBlock from '@/shared/ui/EditableTextBlock'
import Image from 'next/image'
import Link from 'next/link'

const CollaborationIntro = () => {
  return (
    <section className={`container section-spacing-bottom ${styles.collaborationIntro}`}>
      <SectionTitle>сотрудничество</SectionTitle>
      <EditableTextBlock text="Мы всегда открыты к новым идеям, коллаборациям и сотрудничеству. Самые амбициозные идеи и невероятный результат — <span>гарантируем.</span>" />
      <div className={styles.collaborationIntro__content}>
        <div className={styles.collaborationIntro__item}>
          <Link href="/" className={styles.collaborationIntro__link}>
            7 партнеров в России
          </Link>
          <div className={styles.collaborationIntro__imageWrapper}>
            <Image
              src="/test/directions/1.png"
              alt="7 партнеров в России"
              fill
              priority
              sizes="
    (min-width: 1200px) 800px,
    (min-width: 1100px) 700px,
    (min-width: 1000px) 600px,
    (min-width: 900px) 500px,
    (min-width: 800px) 400px,
    (min-width: 700px) 470px,
    (min-width: 600px) 370px,
    (min-width: 500px) 270px,
    (min-width: 400px) 170px,
       calc(100vw - 32px)
  "
            />
          </div>
        </div>
        <div className={styles.collaborationIntro__item}>
          <div className={styles.collaborationIntro__imageWrapper}>
            <Image src="/test/directions/2.png" alt="более 50 реализованных проектов" fill priority
                   sizes="
  (min-width: 1240px) 658px,
  (min-width: 1200px) 600px,
  (min-width: 1150px) 560px,
  (min-width: 1100px) 510px,
  (min-width: 1050px) 460px,
  (min-width: 1000px) 410px,
  (min-width: 950px) 360px,
  (min-width: 900px) 310px,
  (min-width: 850px) 260px,
    (min-width: 768px) 200px,
  (max-width: 767px) calc(100vw - 32px),
  calc(100vw - 32px)
"
            />
          </div>
          <Link href="/" className={styles.collaborationIntro__link}>
            более 50 реализованных проектов
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CollaborationIntro
