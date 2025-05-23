'use client'
import styles from './StreetGalleryMobile.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import {Pagination } from 'swiper/modules'
import Image from 'next/image'

interface StreetGalleryMobileProps {
  images: string[]
}

const StreetGalleryMobile = ({ images }: StreetGalleryMobileProps) => {
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
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div className={styles.item}>
              <Image
                src={`/${img}`}
                fill
                className={styles.imageGallery}
                alt={`image ${i + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  )
}

export default StreetGalleryMobile
