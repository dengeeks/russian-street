'use client'
import styles from './EventFullInfo.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import ActionButton from '@/features/action-buttons'
import EditableTextBlock from '@/shared/ui/EditableTextBlock'
import RegionalLeaderCard from '@/entities/regional-leader-card'

interface EventFullInfoProps {
  description: string;
  region_id: string;
}

const EventFullInfo = ({description, region_id}:EventFullInfoProps) => {
  return (
    <section className={`container section-spacing-top ${styles.eventFullInfoContainer}`}>
      <div className={styles.eventFullInfoContentWrapper}>
        <div className={styles.eventFullInfoDescriptionBlock}>
          <SectionTitle>Описание</SectionTitle>
          <div className={styles.eventFullInfoDescriptionContent}>
            <EditableTextBlock text={description} variant="none" className={styles.eventFullInfoDescriptionText}/>
          </div>
        </div>

        <RegionalLeaderCard region_id={region_id}/>
      </div>

      <div className={styles.eventFullInfoActionsBlock}>
        <ActionButton type="button" modalName="donating" className="outlined white">
          поддержать мероприятие
        </ActionButton>
        <ActionButton className="red" type="button" modalName="join-organization" requireAuth>
          Участвовать
        </ActionButton>
      </div>
    </section>
  )
}

export default EventFullInfo
