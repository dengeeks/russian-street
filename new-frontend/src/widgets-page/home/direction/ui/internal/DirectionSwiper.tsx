'use client'
import "./DirectionSwiper.css"
import { useState, MouseEvent, useMemo } from 'react'
import DirectionCard from '@/entities/home/direction-card'
import { chunkArray } from '@/shared/utils/chunkArray'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { SubDisciplinesType } from '@/shared/api/direction/sub-disciplines/type'

interface DirectionSwiperProps {
  directionsData: SubDisciplinesType[];
}

const DirectionSwiper = ({directionsData}: DirectionSwiperProps) => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null)

  const toggleItem = (index: string) => {
    if (activeIndex !== index) {
      setActiveIndex(index)
    }
  }

  const closeActiveItem = (e: MouseEvent) => {
    e.stopPropagation()
    setActiveIndex(null)
  }

  const chunkedDirections = useMemo(() => chunkArray(directionsData, 11), [directionsData])

  return (
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
            <div className="directionList">
              {chunk.map((dir) => (
                  <DirectionCard
                    key={dir.id}
                    {...dir}
                    isActive={activeIndex === dir.id}
                    onClick={() => toggleItem(dir.id)}
                    onClose={closeActiveItem}
                  />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
  )
}

export default DirectionSwiper;
