'use client'
import styles from './Header.module.css'
import Link from 'next/link'
import Icon from '@/shared/icon'
import { useEffect, useState } from 'react'
import Logo from '@/shared/ui/Logo'
import Button from '@/shared/ui/Button'
import { useBodyScrollLock } from '@/shared/hooks/useBodyScrollLock'
import { usePathname } from 'next/navigation'
import { getParentPath } from '../utils/getParentPath'
import useModal from '@/shared/store/modal'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isRoot = pathname === '/'

  const {openModal} = useModal()

  const parentPath = getParentPath(pathname)

  useBodyScrollLock(isMenuOpen)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

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
          <Logo/>
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
            <Link href="/collaboration" className={styles.menuLink}>
              Сотрудничество
            </Link>
            <button type="button" className={`${styles.buttonAuth} ${styles.buttonMobile} hoverEffect`} onClick={() => openModal('login-user')}>
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
            <Link href="/">
              <Icon icon="youtube" />
            </Link>
          </div>
          <button className={`${styles.IconDesktop} ${styles.buttonAuth} hoverEffect`} onClick={() => openModal('donating')}>
            <Icon icon="donating" />
          </button>
          <Link href="/profile" className={styles.IconDesktop}>
            <Icon icon="profile" />
          </Link>
          <Button type="button" className={`red ${styles.buttonMobile}`} onClick={() => openModal('donating')}>поддержать нас</Button>
        </div>
      </div>
    </header>
  )
}

export default Header
