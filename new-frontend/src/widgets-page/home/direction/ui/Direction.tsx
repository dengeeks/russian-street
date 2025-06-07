'use client'
import styles from  './Direction.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import { useState, MouseEvent } from 'react'
import DirectionCard from '@/entities/home/direction-card'
import { directions } from '../model/mock/directions'
import { chunkArray } from '@/shared/utils/chunkArray'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Arrow } from '@/shared/ui/Arrow'
import { Navigation } from 'swiper/modules'

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

  const chunkedDirections = chunkArray(directions, 11)

  return (
    <section className={`container ${styles.directionHomeSection} section-spacing-top`}>
      <div className={styles.directionHeader}>
        <SectionTitle>направления</SectionTitle>
        <div className={`${styles.directionNavWrapper} ${styles.directionTopNav} ContentShowcase`}>
          <Arrow styleClass="direction__home-prev" icon="chevron" />
          <Arrow styleClass="direction__home-next" icon="chevron" />
        </div>
      </div>
      <Swiper
        slidesPerView={1}
        modules={[Navigation]}
        navigation={{
          prevEl: '.direction__home-prev',
          nextEl: '.direction__home-next'
        }}
        >
        {chunkedDirections.map((chunk, slideIndex) => (
          <SwiperSlide key={slideIndex}>
            <div className={styles.directionList}>
              {chunk.map((dir, i) => {
                const globalIndex = slideIndex * 11 + i
                return (
                  <DirectionCard
                    key={globalIndex}
                    title={dir.title}
                    img={dir.img}
                    isActive={activeIndex === globalIndex}
                    onClick={() => toggleItem(globalIndex)}
                    onClose={closeActiveItem}
                  />
                )
              })}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={`${styles.directionNavWrapper} ${styles.directionBottomNav} ContentShowcase`}>
        <Arrow styleClass="direction__home-prev" icon="chevron" />
        <Arrow styleClass="direction__home-next" icon="chevron" />
      </div>
    </section>
  )
}

export default Direction
