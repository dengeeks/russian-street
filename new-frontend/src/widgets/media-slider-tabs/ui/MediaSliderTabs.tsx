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
import {getVideoThumbnail} from "../utils/getVideoThumbnail"
import { useMobileDetection } from '@/shared/hooks/useIsMobile'
import type {GalleryItem} from "@/shared/api/direction/detail-discipline/type"
import { extractVideoId } from '@/shared/utils/extractVideoId'
import { getImageUrl } from '@/shared/utils/getImageUrl'

interface MediaSliderTabsProps {
  gallery_items: GalleryItem[];
}

const MediaSliderTabs = ({gallery_items}: MediaSliderTabsProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const isMobile = useMobileDetection()

  return (
    <section className={`container ${styles.mediaSlider}`}>
      <Swiper
        loop
        grabCursor
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {gallery_items.map((media, index) => (
          <SwiperSlide className={styles.mediaSlider__main} key={index}>
            {media.format_type === 'image' ? (
              <MediaSwitcher
                type={media.format_type}
                src={media.image}
                alt={`Изображение направления №${index + 1}`}
                sizes="(min-width: 1240px) 1204px, calc(100vw - 32px)"
              />
            ) : (
              <MediaSwitcher
                type="video_url"
                source={extractVideoId(media.video_url || '')}
              />
            )}
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
        {gallery_items.map((media, index) => (
          <SwiperSlide key={index} style={{ width: 'auto', height: 'auto' }} className={`${styles.mediaSlider__thumb} ${activeIndex === index ? styles.mediaSlider__thumbActive : ''}`}>
              {media.format_type === 'video_url' ? (
                <Image
                  src={getVideoThumbnail(media.video_url) || '/assets/webp/mock/mock-admin.webp'}
                  alt={`Превью видео направления №${index + 1}`}
                  width={184}
                  height={139}
                />
              ) : (
                <Image src={getImageUrl(media.image || undefined)} alt={`Миниатюра направления №${index + 1}`} width={184} height={139}/>
              )}
          </SwiperSlide>
        ))}
      </Swiper>
        )}
    </section>
  )
}

export default MediaSliderTabs
