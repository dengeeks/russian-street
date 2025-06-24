'use client'
import styles from './Footer.module.css'
import Link from 'next/link'
import Logo from '@/shared/ui/Logo'
import { useGlobalData } from '@/shared/context/global-data/useGlobalDataContext'
import Image from 'next/image'
import { getImageUrl } from '@/shared/utils/getImageUrl'
import ActionButton from '@/features/action-buttons'

const Footer = () => {
  const {staticContact} = useGlobalData();
  
  const {contact_footer, email_footer} = staticContact;

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
          <ActionButton type="button" modalName="donating">Поддержать нас</ActionButton>
          <p className={`${styles.supportText} ${styles.hiddenMobile}`}>
            Служба поддержки &nbsp;
            <a href={`mailto:${email_footer?.email || ''}`} className={styles.supportLink}>
              {email_footer?.email || '...'}
            </a>
          </p>
        </div>

        <div className={styles.social}>
          <div>
            <p className={styles.socialTitle}>Мы в социальных сетях</p>
            <div className={styles.socialIcons}>
              {contact_footer?.map((social, index) => (
                <Link href={social?.url || '#'} key={index} className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                  <Image src={getImageUrl(social?.image)} width={42} height={42} alt="Социальная сеть Улицы России" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <p className={`${styles.supportText} ${styles.hiddenDesktop}`}>
          Служба поддержки &nbsp;
          <a href={`mailto:${email_footer?.email || ''}`} className={styles.supportLink} target="_blank" rel="noopener noreferrer" aria-label={`Отправить письмо на ${email_footer?.email || 'email'}`}>
            {email_footer?.email || '...'}
          </a>
        </p>
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
