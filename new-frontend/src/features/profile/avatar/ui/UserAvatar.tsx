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
            />
            <div className={styles.userProfileImageEdit}><Icon icon="edit-avatar" width={33} height={33}/></div>
          </div>
  )
}

export default UserAvatar
