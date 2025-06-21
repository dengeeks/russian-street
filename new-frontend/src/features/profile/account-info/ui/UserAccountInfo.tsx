'use client'
import styles from './UserAccountInfo.module.css'
import Icon from '@/shared/icon'
import useModal from '@/shared/store/modal'
import { useGlobalData } from '@/shared/context/global-data/useGlobalDataContext'

const UserAccountInfo = () => {
  const { openModal } = useModal()
  const { userData } = useGlobalData()

  return (
    <div className={styles.userProfileContent}>
      <div className={styles.userProfileTitle}>
        <div className={styles.userProfileSectionHeading}>информация</div>
        <Icon
          className={styles.userProfileEditIcon}
          width={24}
          height={24}
          icon="edit"
          onClick={() => openModal('edit-account-info')}
        />
      </div>

      <div className={styles.userProfileDetails}>
        <div className={styles.userProfileDetailItem}>
          <div className={styles.userProfileDetailLabel}>Фамилия</div>
          <div className={styles.userProfileDetailValue}>{userData?.last_name || 'Нету'}</div>
        </div>
        <div className={styles.userProfileDetailItem}>
          <div className={styles.userProfileDetailLabel}>Имя</div>
          <div className={styles.userProfileDetailValue}>{userData?.first_name || 'Нету'}</div>
        </div>
        <div className={styles.userProfileDetailItem}>
          <div className={styles.userProfileDetailLabel}>Отчество</div>
          <div className={styles.userProfileDetailValue}>{userData?.middle_name || 'Нету'}</div>
        </div>
        {userData?.status && (
          <div className={styles.userProfileDetailItem}>
            <div className={styles.userProfileDetailLabel}>Статус</div>
            <div className={`${styles.userProfileDetailValue} ${styles.userProfileMember}`}>
              <Icon icon="check-circle" width={24} height={24} />
              <span>Участник</span>
            </div>
          </div>
        )}

        <div className={styles.userProfileDetailItem}>
          <div className={styles.userProfileDetailLabel}>Электронная почта</div>
          <div className={styles.userProfileDetailValue}>{userData?.email || 'Нету'}</div>
        </div>

        <div className={styles.userProfileDetailItem}>
          <div className={styles.userProfileDetailLabel}>Номер телефона</div>
          <div className={styles.userProfileDetailValue}>{userData?.phone_number || 'Нету'}</div>
        </div>
        {userData?.region && (
          <div className={styles.userProfileDetailItem}>
            <div className={styles.userProfileDetailLabel}>Регион</div>
            <div className={styles.userProfileDetailValue}>{userData?.region}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserAccountInfo
