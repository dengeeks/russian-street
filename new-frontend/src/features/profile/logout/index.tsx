import styles from './Logout.module.css'
import Icon from '@/shared/icon'

const Logout = () => {
  return (
    <div className={styles.logoutWrapper}>
      <button type="button" className={styles.logoutButton}>
        <span>Выйти</span>
        <Icon icon="logout" width={24} height={24} />
      </button>
    </div>
  )
}

export default Logout
