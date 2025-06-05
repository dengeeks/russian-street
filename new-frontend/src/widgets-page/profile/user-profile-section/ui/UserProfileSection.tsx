'use client'
import styles from './UserProfileSection.module.css'
import RegionalLeaderCard from '@/entities/regional-leader-card'
import SectionTitle from '@/shared/ui/SectionTitle'
import Button from '@/shared/ui/Button'
import { UserAvatar, UserAccountInfo, Logout, DonationHistory } from '@/features/profile'
import useModal from '@/shared/store/modal'

const UserProfileSection = () => {
  const {openModal} = useModal();
  return (
    <section className={`container ${styles.userProfileSection}`}>
      <Logout />
      <div className={styles.userProfileWrapper}>
        <div className={styles.userProfileHeader}>
          <SectionTitle>Личный кабинет</SectionTitle>
          <Button type="button" className="red" onClick={() => openModal('join-organization')}>
            вступить в организацию
          </Button>
        </div>
        <div className={styles.userProfileInfo}>
          <div className={styles.userProfileContainer}>
            <UserAvatar />
            <div className={styles.userProfileDetailsWrapper}>
              <UserAccountInfo />
              <DonationHistory />
            </div>
          </div>
          <RegionalLeaderCard />
        </div>
      </div>
    </section>
  )
}

export default UserProfileSection
