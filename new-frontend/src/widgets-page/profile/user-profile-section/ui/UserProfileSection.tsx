'use client'
import styles from './UserProfileSection.module.css'
import RegionalLeaderCard from '@/entities/regional-leader-card'
import SectionTitle from '@/shared/ui/SectionTitle'
import { UserAvatar, UserAccountInfo, Logout, DonationHistory } from '@/features/profile'
import JoinOrganizationButton from '@/features/join-organization-button'

const UserProfileSection = () => {

  return (
    <section className={`container ${styles.userProfileSection}`}>
      <Logout />
      <div className={styles.userProfileWrapper}>
        <div className={styles.userProfileHeader}>
          <SectionTitle>Личный кабинет</SectionTitle>
          <JoinOrganizationButton>вступить в организацию</JoinOrganizationButton>
        </div>
        <div className={styles.userProfileInfo}>
          <div className={styles.userProfileContainer}>
            <UserAvatar />
            <div className={styles.userProfileDetailsWrapper}>
              <UserAccountInfo/>
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
