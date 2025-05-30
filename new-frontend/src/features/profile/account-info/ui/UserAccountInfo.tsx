'use client';
import styles from './UserAccountInfo.module.css'
import Icon from '@/shared/icon'
import useModal from '@/shared/store/modal'

const UserAccountInfo = () => {
  const {openModal} = useModal()

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
          <div className={styles.userProfileDetailValue}>Пупкин</div>
        </div>
        <div className={styles.userProfileDetailItem}>
          <div className={styles.userProfileDetailLabel}>Имя</div>
          <div className={styles.userProfileDetailValue}>Валерий</div>
        </div>
        <div className={styles.userProfileDetailItem}>
          <div className={styles.userProfileDetailLabel}>Отчество</div>
          <div className={styles.userProfileDetailValue}>Юрьевич</div>
        </div>
        <div className={styles.userProfileDetailItem}>
          <div className={styles.userProfileDetailLabel}>Статус</div>
          <div className={`${styles.userProfileDetailValue} ${styles.userProfileMember}`}>
            <Icon icon="check-circle" width={24} height={24} />
            <span>Участник</span>
          </div>
        </div>

        <div className={styles.userProfileDetailItem}>
          <div className={styles.userProfileDetailLabel}>Электронная почта</div>
          <div className={styles.userProfileDetailValue}>pupkin.valera00@mail.ru</div>
        </div>

        <div className={styles.userProfileDetailItem}>
          <div className={styles.userProfileDetailLabel}>Номер телефона</div>
          <div className={styles.userProfileDetailValue}>+7 983 456 15 27</div>
        </div>

        <div className={styles.userProfileDetailItem}>
          <div className={styles.userProfileDetailLabel}>Регион</div>
          <div className={styles.userProfileDetailValue}>
            <span>г.Москва</span>
            <br />
            <span className={styles.userProfileRegionContact}>
              (pupkin.valera00@mail.ru,
              <br />
              +7 983 456 15 27)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserAccountInfo
