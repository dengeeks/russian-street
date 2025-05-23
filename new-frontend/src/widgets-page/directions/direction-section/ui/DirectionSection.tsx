import './DirectionSection.css'
import DirectionItem from '@/entities/direction/direction-item'
import { directionList } from '../model/mock/directionList'

const DirectionSection = () => {
  return (
    <section className="container section-spacing-top direction__section">
      {directionList.map((direction, index) => (
        <DirectionItem key={index} {...direction} />
      ))}
    </section>
  )
}

export default DirectionSection
