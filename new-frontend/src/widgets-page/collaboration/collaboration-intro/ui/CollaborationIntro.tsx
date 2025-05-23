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
    100vw
  "
            />
          </div>
        </div>
        <div className={styles.collaborationIntro__item}>
          <div className={styles.collaborationIntro__imageWrapper}>
            <Image src="/test/directions/2.png" alt="более 50 реализованных проектов" fill priority
                   sizes="
    (min-width: 1200px) 650px,
    (min-width: 1100px) 516px,
    (min-width: 1000px) 416px,
    (min-width: 900px) 316px,
    (min-width: 800px) 216px,
    (min-width: 700px) 650px,
    (min-width: 600px) 550px,
    (min-width: 500px) 450px,
    (min-width: 400px) 350px,
    100vw
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
