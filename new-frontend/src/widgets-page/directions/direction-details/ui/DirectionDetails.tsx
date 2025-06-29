import styles from './DirectionDetails.module.css'
import Button from '@/shared/ui/Button'
import SectionTitle from '@/shared/ui/SectionTitle'
import {DetailDisciplineType} from "@/shared/api/direction/detail-discipline/type"
import EditableTextBlock from '@/shared/ui/EditableTextBlock'

const DirectionDetails = ({description, name}:DetailDisciplineType) => {
  return (
    <section className={`container section-spacing-bottom ${styles.directionDetails}`}>
      <div className={styles.directionDetails__content}>
        <SectionTitle>{name}</SectionTitle>
        <EditableTextBlock variant="compact" text={description} />
      </div>
      <Button className="red">мероприятия</Button>
    </section>
  )
}

export default DirectionDetails
