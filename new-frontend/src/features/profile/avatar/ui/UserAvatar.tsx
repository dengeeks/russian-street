'use client'
import styles from './UserAvatar.module.css'
import Image from 'next/image'
import Icon from '@/shared/icon'
import {ChangeEvent } from 'react'

const UserAvatar = () => {

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log('Выбран файл:', file)
    }
  }

  return (
    <div className={styles.userProfileImageWrapper}>
      <Image
        src="/test/whoweare2.png"
        fill
        alt=""
        className={styles.userProfileImage}
        sizes="
  (min-width: 1240px) 426px,
  (min-width: 1100px) 360px,
  (min-width: 1050px) 340px,
  (max-width: 1023px) 426px,
  (max-width: 460px) calc(100vw - 32px),
"
      />
      <label htmlFor="avatar-upload" className={styles.userProfileImageEdit}>
        <Icon icon="edit-avatar" width={33} height={33} />
      </label>
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default UserAvatar
