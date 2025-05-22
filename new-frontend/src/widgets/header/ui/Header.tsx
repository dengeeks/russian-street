'use client'
import styles from './Header.module.css'
import Link from 'next/link'
import Icon from '@/shared/icon'
import { useState } from 'react'
import Logo from '@/shared/ui/Logo'
import Button from '@/shared/ui/Button'
import { useBodyScrollLock } from '@/shared/hooks/useBodyScrollLock'
import { usePathname } from 'next/navigation'
import { getParentPath } from '../lib/getParentPath'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isRoot = pathname === '/'

  const parentPath = getParentPath(pathname)

  useBodyScrollLock(isMenuOpen)

  const toggleMenu = () => setIsMenuOpen(prev => !prev)

  return (
    <header className={`${styles.header} ${isMenuOpen ? styles.active : ''}`}>
      <div className="container">
        <div className={styles.headerBurger}>
          <Link
            href={parentPath}
            className={`${styles.headerBreadcrumbs} ${isRoot ? styles.hidden : ''}`}
          >
            <Icon icon="arrow" width={24} height={24} />
          </Link>
          <button type="button" onClick={toggleMenu} className={styles.burgerButton} aria-label="Меню">
            <Icon icon={isMenuOpen ? 'close' : 'burger'} width={24} height={24}/>
          </button>
        </div>
        <div className={styles.headerContent}>
          <Logo onClick={toggleMenu} />
          <nav className={styles.menu}>
            <Link href="/events" className={styles.menuLink} onClick={toggleMenu}>
              Мероприятия
            </Link>
            <Link href="/about-us" className={styles.menuLink} onClick={toggleMenu}>
              О нас
            </Link>
            <Link href="/directions" className={styles.menuLink} onClick={toggleMenu}>
              Направления
            </Link>
            <Link href="/blog" className={styles.menuLink} onClick={toggleMenu}>
              Блог
            </Link>
            <Link href="/contacts" className={styles.menuLink} onClick={toggleMenu}>
              Сотрудничество
            </Link>
            <button type="button" className={`${styles.buttonAuth} ${styles.buttonMobile}`} onClick={toggleMenu}>
              Войти
            </button>
          </nav>
          <div className={styles.social}>
            <Link href="/" onClick={toggleMenu}>
              <Icon icon="vk" />
            </Link>
            <Link href="/" onClick={toggleMenu}>
              <Icon icon="telegram" />
            </Link>
          </div>
          <Link href="/" className={styles.IconDesktop} onClick={toggleMenu}>
            <Icon icon="donating" />
          </Link>
          <Link href="/" className={styles.IconDesktop} onClick={toggleMenu}>
            <Icon icon="profile" />
          </Link>
          <Button type="button" className={`red ${styles.buttonMobile}`} onClick={toggleMenu}>поддержать нас</Button>
        </div>
      </div>
    </header>
  )
}

export default Header
