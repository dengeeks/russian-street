'use client'
import styles from './StreetGalleryMobile.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import {Pagination } from 'swiper/modules'
import Image from 'next/image'
import { useHomeData } from '@/shared/context/home-data/useHomeDataContext'
import { getImageUrl } from '@/shared/utils/getImageUrl'

const StreetGalleryMobile = () => {
  const { homeData: { street_images } } = useHomeData()

  const sortedImages = [...street_images].sort((a, b) => a.order - b.order)

  return (
    <div className={`container ${styles.galleryMobile}`}>
      <SectionTitle>Галерея</SectionTitle>
      <Swiper
        modules={[Pagination]}
        slidesPerView="auto"
        loop
        pagination={{
          clickable: true,
        }}
        className="SwiperPagination"
      >
        {sortedImages.map((img, i) => (
          <SwiperSlide key={i}>
            <div className={styles.item}>
              <Image
                src={getImageUrl(img.image)}
                fill
                className={styles.imageGallery}
                alt={`Улица — изображение  ${i + 1}`}
                sizes="calc(100vw - 32px)"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  )
}

export default StreetGalleryMobile
