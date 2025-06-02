import styles from "./ProfileParticipationCard.module.css";
import Icon from '@/shared/icon'
import Tag from '@/shared/ui/Tag'
import Image from 'next/image'

const ProfileParticipationCard = () => {
  return (
    <div className={styles.participationCard}>
      <div className={styles.participationCardImageWrapper}>
        <Image src="/test/events.png" alt="" fill sizes="
  (min-width: 1200px) 286px,
  (min-width: 1100px) 260px,
  (min-width: 1024px) 240px,
  (max-width: 1023px) calc(50vw - 16px),
  (max-width: 767px) calc(100vw - 32px),
"/>
      </div>
      <div className={styles.participationCardContent}>
        <div className={styles.participationCardInfo}>
          <div className={styles.participationCardTags}>
            <Tag variant="location">Москва</Tag>
            <Tag>Street art</Tag>
          </div>
          <div className={styles.participationCardDate}>12-15 мая 2024 г.</div>
        </div>
        <div className={styles.participationCardText}>
          <div className={styles.participationCardTitle}>
            Паркур соревнования на скорость «Забег за подарками»
          </div>
          <div className={styles.participationCardDescription}>
            Море рационального перемещения, в виде соревнований по прохождению
            заданной трассы на время, излюбленные всеми паркур-челленджи, еда и
            напитки в кругу единомышленников, а ещё вас ждут призы от наших
            спонсоров и денежный призовой фонд.
          </div>
        </div>
        <div className={styles.participationCardButton}>
          <div className={styles.participationCardButtonText}>Подробнее</div>
          <Icon icon="chevron" width={24} height={24} className="right"/>
        </div>
      </div>
    </div>
  )
}

export default ProfileParticipationCard;
