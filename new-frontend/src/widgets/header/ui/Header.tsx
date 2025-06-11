'use client'
import './Header.css'
import Link from 'next/link'
import Icon from '@/shared/icon'
import { useEffect, useState } from 'react'
import Logo from '@/shared/ui/Logo'
import { useBodyScrollLock } from '@/shared/hooks/useBodyScrollLock'
import { usePathname } from 'next/navigation'
import { getParentPath } from '../utils/getParentPath'
import { MenuLinks, SocialLinks, AuthProfileButton, DonateButton } from '@/widgets/header/ui/internal'


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isRoot = pathname === '/'

  useBodyScrollLock(isMenuOpen)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const parentPath = getParentPath(pathname)
  const toggleMenu = () => setIsMenuOpen(prev => !prev)

  return (
    <header className={`header ${isMenuOpen ? 'active' : ''}`}>
      <div className="container">
        <div className="header-burger">
          <Link
            href={parentPath}
            className={`header-breadcrumbs ${isRoot ? 'hidden' : ''}`}
          >
            <Icon icon="arrow" width={24} height={24} />
          </Link>
          <button
            type="button"
            onClick={toggleMenu}
            className="header-burger-button"
            aria-label="Меню"
          >
            <Icon icon={isMenuOpen ? 'close' : 'burger'} width={24} height={24} />
          </button>
        </div>
        <div className="header-content">
          <Logo />
          <MenuLinks/>
          <SocialLinks/>
          <DonateButton className="header-icon-desktop header-button-auth" iconOnly />
          <AuthProfileButton mode="icon" className="header-icon-desktop" />
          <DonateButton className="header-button-mobile" />
        </div>
      </div>
    </header>
  )
}

export default Header
