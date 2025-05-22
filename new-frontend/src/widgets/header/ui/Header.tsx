'use client'
import styles from './Header.module.css'
import Link from 'next/link'
import Icon from '@/shared/icon'
import { useState } from 'react'
import Logo from '@/shared/ui/Logo'
import Button from '@/shared/ui/Button'
import { useBodyScrollLock } from '@/shared/hooks/useBodyScrollLock'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useBodyScrollLock(isMenuOpen)

  const toggleMenu = () => setIsMenuOpen(prev => !prev)

  return (
    <header className={` ${styles.header} ${isMenuOpen ? styles.active : ''}`}>
      <div className="container">
        <div className={styles.headerBurger}>
          <button type="button" onClick={toggleMenu} className={styles.burgerButton} aria-label="Меню">
            <Icon icon={isMenuOpen ? 'close' : 'burger'} width={24} height={24}/>
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
            <button type="button" className={`${styles.buttonAuth} ${styles.buttonMobile}`}>
              Войти
            </button>
          </nav>
          <div className={styles.social}>
            <Link href="/">
              <Icon icon="vk" />
            </Link>
            <Link href="/">
              <Icon icon="telegram" />
            </Link>
          </div>
          <Link href="/" className={styles.IconDesktop}>
            <Icon icon="donating" />
          </Link>
          <Link href="/" className={styles.IconDesktop}>
            <Icon icon="profile" />
          </Link>
          <Button type="button" className={`red ${styles.buttonMobile}`} >поддержать нас</Button>
        </div>
      </div>
    </header>
  )
}

export default Header
