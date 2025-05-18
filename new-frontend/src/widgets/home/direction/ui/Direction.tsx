'use client'
import './Direction.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import { useState, MouseEvent } from 'react'
import DirectionCard from '@/entities/home/direction-card'
import {directions} from "../model/mock/directions"

const Direction = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    if (activeIndex !== index) {
      setActiveIndex(index)
    }
  }

  const closeActiveItem = (e: MouseEvent) => {
    e.stopPropagation()
    setActiveIndex(null)
  }

  return (
    <section className="container direction__section section-spacing-top">
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
    </section>
  )
}

export default Direction
