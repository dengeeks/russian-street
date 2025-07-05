'use client'
import './ContentShowcase.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import { Arrow } from '@/shared/ui/Arrow'
import ArticleCard from '@/entities/article-card'
import Link from 'next/link'

interface ContentShowcaseProps {
  title: string
}

const ContentShowcase = ({ title }: ContentShowcaseProps) => {
  return (
    <section className="container content-showcase section-spacing-top section-spacing-bottom">
        <SectionTitle>{title}</SectionTitle>
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
          {Array.from({ length: 10 }).map((_, index) => (
            <SwiperSlide key={index} style={{width: 'auto'}}>
              <ArticleCard />
            </SwiperSlide>
          ))}
          <Arrow styleClass="swiper-button-prev content-showcase-prev" />
          <Arrow styleClass="swiper-button-next content-showcase-next" />
        </Swiper>
       <Link className="more-link content-showcase_hidden-desktop" href="/">смотреть все</Link>
    </section>
  )
}

export default ContentShowcase
