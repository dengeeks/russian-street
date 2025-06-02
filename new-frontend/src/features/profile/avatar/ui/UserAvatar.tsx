import styles from './UserAvatar.module.css'
import Image from 'next/image'
import Icon from '@/shared/icon'

const UserAvatar = () => {
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
      <div className={styles.userProfileImageEdit}>
        <Icon icon="edit-avatar" width={33} height={33} />
      </div>
    </div>
  )
}

export default UserAvatar
