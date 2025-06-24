'use client'
import styles from './ProfileEventGallery.module.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Pagination } from 'swiper/modules'
import { Arrow } from '@/shared/ui/Arrow'

const images = ['/assets/test/events.png', '/assets/test/whoweare2.png']

const ProfileEventGallery = () => {
  return (
    <div className={styles.profileEventGallery}>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        modules={[FreeMode, Navigation, Pagination]}
        navigation={{
          prevEl: '.profile-event-prev',
          nextEl: '.profile-event-next',
          enabled: true
        }}
        pagination={{
          clickable: true,
        }}
      className="ContentShowcase">

        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image src={src} alt={`Изображение ${index + 1}`} fill className={styles.galleryImage}
                   sizes="(min-width: 1100px) 650px,
       (min-width: 950px) 500px,
       (min-width: 768px) 400px,
       calc(100vw - 32px)"
            />
          </SwiperSlide>
        ))}
        <Arrow styleClass="swiper-button-prev profile-event-prev" />
        <Arrow styleClass="swiper-button-next profile-event-next" />
      </Swiper>
    </div>
  )
}

export default ProfileEventGallery
