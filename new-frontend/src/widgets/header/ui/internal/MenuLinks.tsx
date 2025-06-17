import Link from 'next/link'
import { AuthProfileButton } from '@/widgets/header/ui/internal/AuthToggleButton'

export const MenuLinks = () => {
  return (
    <nav className="header-menu">
      <Link href="/events" className="header-menu-link">
        Мероприятия
      </Link>
      <Link href="/about-us" className="header-menu-link">
        О нас
      </Link>
      <Link href="/directions" className="header-menu-link">
        Направления
      </Link>
      <Link href="/blog" className="header-menu-link">
        Блог
      </Link>
      <Link href="/collaboration" className="header-menu-link">
        Сотрудничество
      </Link>
      <AuthProfileButton
        mode="text"
        className="header-button-mobile header-menu-link"
      />
    </nav>
  )
}
