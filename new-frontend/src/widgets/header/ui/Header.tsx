'use client'
import './Header.css'
import Link from 'next/link'
import Icon from '@/shared/icon'
import { useEffect, useState } from 'react'
import Logo from '@/shared/ui/Logo'
import { useBodyScrollLock } from '@/shared/hooks/useBodyScrollLock'
import { usePathname } from 'next/navigation'
import { getParentPath } from '../utils/getParentPath'
import { MenuLinks, SocialLinks, AuthProfileButton } from './internal'
import ActionButton from '@/features/action-buttons'


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
          <ActionButton className="header-icon-desktop header-button-auth hoverEffect" modalName="donating" aria-label="Поддержать нас">
            <Icon icon="donating" />
          </ActionButton>
          <AuthProfileButton mode="icon" className="header-icon-desktop" />
          <ActionButton className="red header-button-mobile" modalName="donating">
            поддержать нас
          </ActionButton>
        </div>
      </div>
    </header>
  )
}

export default Header
