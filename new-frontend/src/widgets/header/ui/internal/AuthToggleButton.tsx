'use client'
import Link from 'next/link'
import Icon from '@/shared/icon'
import useModal from '@/shared/store/modal'
import { useGlobalData } from '@/shared/context/global-data/useGlobalDataContext'
import Image from 'next/image'
import { getImageUrl } from '@/shared/utils/getImageUrl'

interface AuthProfileButtonProps {
  mode: 'icon' | 'text'
  className?: string
}

export const AuthProfileButton = ({ mode, className = '' }: AuthProfileButtonProps) => {
  const { openModal } = useModal()
  const { userData } = useGlobalData()

  if (userData?.email) {
    return mode === 'icon' ? (
      <Link href="/profile" className={className} aria-label="Перейти в профиль" title="Профиль">
          {userData?.avatar ? (
            <Image
              src={getImageUrl(userData.avatar)}
              alt={userData.first_name}
              height={20}
              width={20}
              className="profileIcon"
            />
          ) : (
            <Icon icon="profile" />
          )}
      </Link>
    ) : (
      <Link href="/profile" className={className} aria-label="Перейти в профиль">
        Профиль
      </Link>
    )
  }

  return mode === 'icon' ? (
    <button
      className={`hoverEffect header-button-auth ${className}`}
      onClick={() => openModal('login-user')}
      aria-label="Открыть окно входа"
      title="Войти"
    >
      <Icon icon="profile" />
    </button>
  ) : (
    <button
      type="button"
      className={`hoverEffect header-button-auth ${className}`}
      onClick={() => openModal('login-user')}
      aria-label="Открыть окно входа"
    >
      Войти
    </button>
  )
}
