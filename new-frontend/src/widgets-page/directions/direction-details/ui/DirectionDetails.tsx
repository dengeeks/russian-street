import styles from './DirectionDetails.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import {DetailDisciplineType} from "@/shared/api/direction/detail-discipline/type"
import EditableTextBlock from '@/shared/ui/EditableTextBlock'
import Link from 'next/link'

const DirectionDetails = ({description, name, id}:DetailDisciplineType) => {
  return (
    <section className={`container section-spacing-bottom ${styles.directionDetails}`}>
      <div className={styles.directionDetails__content}>
        <SectionTitle>{name}</SectionTitle>
        <EditableTextBlock variant="compact" text={description} />
      </div>
      <Link href={`/events?subdiscipline_ids=${id}`} className="button red white">мероприятия</Link>
    </section>
  )
}

export default DirectionDetails
