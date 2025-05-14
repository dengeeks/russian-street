'use client'
import './Direction.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import { useState } from 'react'
import DirectionCard from '@/entities/home/direction-card/ui/DirectionCard'


const directions = [
  { title: 'STREET ART', img: '/test/events.png' },
  { title: 'PARKOUR', img: '/test/events.png' },
  { title: 'WORKOUT', img: '/test/events.png' },
  { title: 'FREERUN', img: '/test/events.png' },
  { title: 'HIP-HOP DANCE', img: '/test/events.png' },
  { title: 'TRICKING', img: '/test/events.png' },
  { title: 'RAP', img: '/test/events.png' },
  { title: 'BREAKING', img: '/test/events.png' },
  { title: 'BMX', img: '/test/events.png' },
  { title: 'SKATEBOARDING', img: '/test/events.png' },
  { title: 'SCOOT', img: '/test/events.png' }
]



const Direction = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    if (activeIndex !== index) {
      setActiveIndex(index)
    }
  }

  const closeActiveItem = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveIndex(null)
  }

  return (
    <section className="background">
      <div className="container direction__section">
        <SectionTitle>направления</SectionTitle>
        <div className="direction__list">
          {directions.map((dir, i) => (
            <DirectionCard
              key={i}
              title={dir.title}
              img={dir.img}
              isActive={activeIndex === i}
              onClick={() => toggleItem(i)}
              onClose={closeActiveItem}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Direction
