import styles from './RegionLeader.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import Image from 'next/image'
import Link from 'next/link'
import Icon from '@/shared/icon'

const RegionLeader = () => {
  return (
    <section className={`container section-spacing-top section-spacing-bottom ${styles.regionLeader}`}>
      <SectionTitle>Руководитель</SectionTitle>
      <div className={styles.regionLeaderWrapper}>
        <div className={styles.regionLeaderImageWrapper}>
          <Image src="/assets/test/events.png" fill alt="Фото руководителя"
                 sizes="
    (min-width: 880px) 427px,
    (min-width: 850px) 400px,
    (min-width: 820px) 370px,
    (min-width: 768px) 350px,
    (min-width: 470px) 427px
    (max-width: 469px) calc(100vw - 32px)"
          />
        </div>
        <div className={styles.regionLeaderContent}>
          <div className={styles.regionLeaderName}>
            Пупкин Валерий Юрьевич
          </div>
          <p className={styles.regionLeaderDescription}>
            Описание руководителя региона. Описание руководителя региона.
            <br />
            Описание руководителя региона. Описание руководителя региона.
          </p>
          <div className={styles.regionLeaderContacts}>
            <div className={styles.contactItem}>
              <span className={styles.contactTitle}>Электронная почта</span>
              <span className={styles.contactValue}>pupkin.valera00@mail.ru</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactTitle}>Номер телефона</span>
              <span className={styles.contactValue}>+7 983 456 15 27</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactTitle}>Адрес офиса</span>
              <span className={styles.contactValue}>г. Москва</span>
            </div>
          </div>
          <div className={styles.regionLeaderSocials}>
            <Link href="/">
              <Icon icon="telegram" height={42} width={42} />
            </Link>
            <Link href="/">
              <Icon icon="vk" height={42} width={42} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegionLeader