'use client'
import styles from './DirectionSubcategories.module.css'
import Link from 'next/link'
import { SubCategory } from '../../model/type'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useState } from 'react'
import { chunkArray } from '@/shared/utils/chunkArray'
import { getAdditionalSubcategories } from '@/entities/direction/direction-item/utils/getAdditionalSubcategories'

interface DirectionSubcategoriesProps {
  data: SubCategory[]
}

const DirectionSubcategories = ({ data }: DirectionSubcategoriesProps) => {
  const chunkSize = 5
  const chunkedData = chunkArray(data, chunkSize)
  const [activeIndex, setActiveIndex] = useState(0)

  const currentChunk = chunkedData[activeIndex] || []
  const additional = getAdditionalSubcategories(data, currentChunk)

  return (
    <div className={styles.directionSubcategories}>
      <Swiper
        slidesPerView={1}
        className={styles.directionSubcategories__center}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {chunkedData.map((chunk, chunkIndex) => (
          <SwiperSlide key={chunkIndex}>
            <div className={styles.directionSubcategories__group}>
              {chunk.map((sub, index) => (
                <Link
                  key={index}
                  href={`/directions/${sub.slug}`}
                  className={`${styles.directionSubcategories__item} ${styles[`item${index + 1}`]} dashed-all`}
                >
                  <div className={styles.directionSubcategories__itemText}>{sub.title}</div>
                </Link>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {additional.length > 0 && (
        <div className={styles.directionSubcategories__additional}>
          <div className={styles.directionSubcategories__additionalText}>
            А также: {additional.map((item) => item.title).join(', ')}
          </div>
        </div>
      )}
    </div>
  )
}

export default DirectionSubcategories
