import styles from './Footer.module.css'
import Button from '@/shared/ui/Button'
import Link from 'next/link'
import Logo from '@/shared/ui/Logo'
import Icon from '@/shared/icon'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <Logo />
        <div className={`${styles.orgInfo} ${styles.hiddenMobile}`}>
          <p className={styles.orgTitle}>
            Общероссийская общественная организация уличной культуры и спорта «Улицы России»
          </p>
          <p className={styles.orgSubtitle}>ОГРН: 1217700519101 ИНН: 2636219592</p>
        </div>
      </div>
      <div className={`${styles.menu} ${styles.container} container`}>
        <nav className={styles.nav}>
          <Link href="/events">Мероприятия</Link>
          <Link href="/about-us">О нас</Link>
          <Link href="/directions">Направления</Link>
          <Link href="/blog">Блог</Link>
          <Link href="/collaboration">Сотрудничество</Link>
          <Link href="/">Для СМИ</Link>
          <Link href="/">Документы</Link>
        </nav>

        <div className={styles.donation}>
          <Button type="button">Поддержать нас</Button>
          <p className={`${styles.supportText} ${styles.hiddenMobile}`}>Служба поддержки &nbsp;<a href="mailto:support@mail.ru" className={styles.supportLink}>support@mail.ru</a></p>
        </div>

        <div className={styles.social}>
          <div>
            <p className={styles.socialTitle}>Мы в социальных сетях</p>
            <div className={styles.socialIcons}>
              <Link href="#">
                <Icon icon="youtube" width={42} height={42} />
              </Link>
              <Link href="#">
                <Icon icon="telegram" width={42} height={42} />
              </Link>
              <Link href="#">
                <Icon icon="vk" width={42} height={42} />
              </Link>
            </div>
          </div>
        </div>
        <p className={`${styles.supportText} ${styles.hiddenDesktop}`}>Служба поддержки &nbsp;<a href="mailto:support@mail.ru" className={styles.supportLink}>support@mail.ru</a></p>
        <div className={`${styles.orgInfo} ${styles.hiddenDesktop}`}>
          <p className={styles.orgTitle}>
            Общероссийская общественная организация уличной культуры и спорта «Улицы России»
          </p>
          <p className={styles.orgSubtitle}>ОГРН: 1217700519101 ИНН: 2636219592</p>
        </div>
      </div>
      <p className={styles.copyright}>© 2021 - 2024 «Улицы России»</p>
    </footer>
  )
}

export default Footer
