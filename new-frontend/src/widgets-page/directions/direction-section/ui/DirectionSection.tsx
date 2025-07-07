import './DirectionSection.css'
import DirectionItem from '@/entities/direction/direction-item'
import { DisciplinesType } from '@/shared/api/direction/disciplines/type'

interface DirectionSectionProps {
  data: DisciplinesType[];
}

const DirectionSection = ({data}: DirectionSectionProps) => {
  return (
    <section className="container section-spacing-top section-spacing-bottom direction__section">
      {data.map((direction, index) => (
        <DirectionItem key={index} {...direction} />
      ))}
    </section>
  )
}

export default DirectionSection
