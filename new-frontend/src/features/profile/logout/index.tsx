'use client'
import styles from './Logout.module.css'
import Icon from '@/shared/icon'
import { startTransition } from 'react'
import { useRouter } from 'next/navigation'
import { removeTokens } from '@/shared/server-action/removeTokens'

const Logout = () => {
  const router = useRouter()

  const handleLogout = async () => {
    const result = await removeTokens()

    if (result.success) {
      startTransition(() => {
        router.push('/')
      })
    }
  }
  return (
    <div className={styles.logoutWrapper}>
      <button type="button" className={styles.logoutButton} onClick={handleLogout}>
        <span>Выйти</span>
        <Icon icon="logout" width={24} height={24} />
      </button>
    </div>
  )
}

export default Logout
