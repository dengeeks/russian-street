import loadable from 'next/dynamic'
import styles from './UserProfileSection.module.css'
import RegionalLeaderCard from '@/entities/regional-leader-card'
import SectionTitle from '@/shared/ui/SectionTitle'
import { UserAvatar, UserAccountInfo, Logout, DonationHistory } from '@/features/profile'
import ActionButton from '@/features/action-buttons'


const JoinOrganizationPromo = loadable(() => import('./internal/JoinOrganizationPromo'));

const UserProfileSection = () => {
  return (
    <section className={`container ${styles.userProfileSection}`}>
      <Logout />
      <div className={styles.userProfileWrapper}>
        <div className={styles.userProfileHeader}>
          <SectionTitle>Личный кабинет</SectionTitle>
          <ActionButton type="button" modalName="join-organization" requireAuth>вступить в организацию</ActionButton>
        </div>
        <div className={styles.userProfileInfo}>
            <UserAvatar />
            <div className={styles.userProfileDetailsWrapper}>
              <UserAccountInfo />
              <DonationHistory />
            </div>
          <RegionalLeaderCard />
          <JoinOrganizationPromo/>
        </div>
      </div>
    </section>
  )
}

export default UserProfileSection
