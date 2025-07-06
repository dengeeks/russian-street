'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import { Arrow } from '@/shared/ui/Arrow'
import ArticleCard from '@/entities/article-card'
import FavoriteToggleButton from '@/features/favorite-toggle'

type ItemType = {
  id: string
  title: string
  card_image: string
  city: string
  created_at?: string
  starting_date?: string
  is_favorite?: boolean
}

interface ContentShowcaseSwiperProps {
  data: ItemType[]
  type?: 'event' | 'area'
}

const ContentShowcaseSwiper = ({ data, type }: ContentShowcaseSwiperProps) => {
  return (
    <Swiper
      modules={[FreeMode, Navigation]}
      slidesPerView="auto"
      spaceBetween={20}
      navigation={{
        prevEl: '.content-showcase-prev',
        nextEl: '.content-showcase-next',
        enabled: true
      }}
      breakpoints={{
        0: {
          navigation: {
            enabled: false
          }
        },
        769: {
          navigation: {
            enabled: true
          }
        }
      }}
      className="ContentShowcase">
      {data.map(item => (
        <SwiperSlide key={item.id} style={{ width: 'auto' }}>
          <ArticleCard
            id={item.id}
            linkPath={type ? `/events/${item.id}?type=${type}` : `/blog/${item.id}`}
            title={item.title}
            city={item.city}
            starting_date={item.starting_date || item.created_at || ''}
            card_image={item.card_image}>
            {type && ( <FavoriteToggleButton initial={item.is_favorite ?? false} type={type} objectId={item.id} />)}
          </ArticleCard>
        </SwiperSlide>
      ))}
      <Arrow styleClass="swiper-button-prev content-showcase-prev" />
      <Arrow styleClass="swiper-button-next content-showcase-next" />
    </Swiper>
  )
}

export default ContentShowcaseSwiper
