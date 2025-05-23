'use client'
import styles from './MediaSliderTabs.module.css'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import MediaSwitcher from '@/shared/ui/MediaSwitcher'
import type { Swiper as SwiperType } from 'swiper'
import { FreeMode, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { useState } from 'react'
import {getYouTubeThumbnail} from "../utils/getYouTubeThumbnail"
import {mediaList} from "../model/mock/mediaList"
import { useIsMobile } from '@/shared/hooks/useIsMobile'

const MediaSliderTabs = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const isMobile = useIsMobile()

  return (
    <section className={`container ${styles.mediaSlider}`}>
      <Swiper
        loop
        grabCursor
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {mediaList.map((media, index) => (
          <SwiperSlide className={styles.mediaSlider__main} key={index}>
              <MediaSwitcher type={media.type} src={media.src} alt={media.alt || ''} />
          </SwiperSlide>
        ))}
      </Swiper>

      {!isMobile && (
      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView="auto"
        spaceBetween={20}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Thumbs]}
        className={styles.mediaSlider__thumbnails}
      >
        {mediaList.map((media, index) => (
          <SwiperSlide key={index} style={{ width: 'auto', height: 'auto' }} className={`${styles.mediaSlider__thumb} ${activeIndex === index ? styles.mediaSlider__thumbActive : ''}`}>
              {media.type === 'video' ? (
                <Image
                  src={getYouTubeThumbnail(media.src) || '/icons/fallback.jpg'}
                  alt="Видео превью"
                  fill
                />
              ) : (
                <Image src={media.src} alt={media.alt || ''} fill />
              )}
          </SwiperSlide>
        ))}
      </Swiper>
        )}
    </section>
  )
}

export default MediaSliderTabs
