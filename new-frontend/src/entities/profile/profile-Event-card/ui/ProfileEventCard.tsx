import styles from "./ProfileEventCard.module.css"
import Icon from '@/shared/icon'
import ProfileEventGallery from '@/entities/profile/profile-Event-card/ui/ProfileEventGallery'
import Tag from '@/shared/ui/Tag'

const ProfileEventCard = () => {
  return (
    <div className={styles.profileEventCard}>
      <ProfileEventGallery/>
      <div className={styles.profileEventCardContent}>
        <div className={styles.profileEventCardTags}>
          <Tag variant="location">Сыктывкар</Tag>
          <Tag>Street art</Tag>
          <Tag>Hip-Hop Dance</Tag>
        </div>

        <div className={styles.profileEventCardDetails}>
          <div className={styles.profileEventCardHeading}>
            «КЛИЧ» Крытый Скейт-Парк в Сыктывкаре
          </div>

          <div className={styles.profileEventCardInfoBlock}>
            <Icon icon="place" width={24} height={24} />
            <div className={styles.profileEventCardInfoContent}>
              <div className={styles.profileEventCardInfoTitle}>Адрес</div>
              <div className={styles.profileEventCardInfoValue}>
                г. Сыктывкар, ул. Лужники, 24
              </div>
            </div>
          </div>

          <div className={styles.profileEventCardInfoBlock}>
            <Icon icon="clock" width={24} height={24} />
            <div className={styles.profileEventCardInfoContent}>
              <div className={styles.profileEventCardInfoTitle}>Время работы</div>
              <div className={styles.profileEventCardInfoValue}>
                ПН-ПТ 10.00–21.00<br />
                СБ-ВС 11.00–22.00
              </div>
            </div>
          </div>

          <div className={styles.profileEventCardSocial}>
            <Icon icon="vk" />
            <span>Страница в соцсетях</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileEventCard;
