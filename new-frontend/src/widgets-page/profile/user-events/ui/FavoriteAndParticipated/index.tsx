import styles from './FavoriteAndParticipated.module.css'
import ProfileParticipationCard from '@/entities/profile/profile-participation-card'

const FavoriteAndParticipated = () => {
  return (
    <div className={styles.favPartRoot}>
      <div className={styles.favPartTabs}>
        <div className={`${styles.favPartTab} ${styles.favPartTabActive}`}>Ты зарегистрирован</div>
        <div className={styles.favPartTab}>Твои избранные</div>
      </div>

      <div className={styles.favPartCards}>
        <ProfileParticipationCard />
        <ProfileParticipationCard />
        <ProfileParticipationCard />
        <ProfileParticipationCard />
        <ProfileParticipationCard />
      </div>
    </div>
  )
}

export default FavoriteAndParticipated
