'use client'
import styles from './UserAvatar.module.css'
import Image from 'next/image'
import Icon from '@/shared/icon'
import { useGlobalData } from '@/shared/context/global-data/useGlobalDataContext'
import { useUpdateAvatar } from '../model/updateAvatar'
import { getImageUrl } from '@/shared/utils/getImageUrl'

const UserAvatar = () => {
  const {userData} = useGlobalData()
  const { handleFileChange} = useUpdateAvatar()
  const avatarSrc = userData?.avatar ? getImageUrl(userData.avatar) : '/assets/webp/default-avatar.webp'

  return (
    <div className={styles.userProfileImageWrapper}>
      <Image
        src={avatarSrc}
        fill
        alt={`${userData?.first_name} ${userData?.last_name || ''}`}
        className={styles.userProfileImage}
        sizes="
  (min-width: 1240px) 426px,
  (min-width: 1100px) 360px,
  (min-width: 1050px) 340px,
  (max-width: 1023px) 426px,
  (max-width: 460px) calc(100vw - 32px),
"
      />
      <label htmlFor="avatar-upload" className={`${styles.userProfileImageEdit} ${!userData?.avatar && styles.uploadLabel}`}>
        <Icon icon={!userData?.avatar ? 'upload' : 'edit-avatar'}  width={33} height={33} />
        {!userData?.avatar && (
          <span className={styles.uploadLabelText}>Загрузить фото профиля</span>
        )}
      </label>
      <input
        id="avatar-upload"
        type="file"
        accept=".jpg,.jpeg,.png,.gif,.bmp,.webp,.svg"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default UserAvatar

