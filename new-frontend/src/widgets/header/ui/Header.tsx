'use client'
import styles from './Header.module.css'
import Link from 'next/link'
import Icon from '@/shared/icon'
import { useState } from 'react'
import Logo from '@/shared/ui/Logo'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(prev => !prev)

  return (
    <header className={` ${styles.header} ${menuOpen ? styles.active : ''}`}>
      <div className={`${styles.headerWrapper} container `}>
        <div className={styles.headerBurger}>
          <button onClick={toggleMenu} className={styles.burgerButton} aria-label="Меню">
            <Icon icon={menuOpen ? 'close' : 'burger'} width={24} height={24} className={styles.burgerMenu} />
          </button>
        </div>
        <div className={styles.headerContent}>
          <Logo />
          <nav className={styles.menu}>
            <Link href="/events" className={styles.menuLink}>
              Мероприятия
            </Link>
            <Link href="/about-us" className={styles.menuLink}>
              О нас
            </Link>
            <Link href="/directions" className={styles.menuLink}>
              Направления
            </Link>
            <Link href="/blog" className={styles.menuLink}>
              Блог
            </Link>
            <Link href="/contacts" className={styles.menuLink}>
              Сотрудничество
            </Link>
          </nav>
          <div className={styles.social}>
            <Link href="/">
              <Icon icon="vk" />
            </Link>
            <Link href="/">
              <Icon icon="telegram" />
            </Link>
          </div>
          <Link href="/" className={styles.donating}>
            <Icon icon="donating" />
          </Link>
          <Link href="/" className={styles.profile}>
            <Icon icon="profile" />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
