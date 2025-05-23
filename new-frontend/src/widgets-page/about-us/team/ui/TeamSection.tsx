'use client'
import styles from './TeamSection.module.css'
import Image from 'next/image'
import SectionTitle from '@/shared/ui/SectionTitle'
import SelectMenu from '@/shared/ui/SelectMenu'
import { teamList } from '../model/mock/team'
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination, Thumbs } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import 'swiper/css/pagination'
import { useIsMobile } from '@/shared/hooks/useIsMobile'

const TeamSection = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [activeMemberIndex, setActiveMemberIndex] = useState(0)
  const isMobile = useIsMobile()
  const filteredList = teamList.filter(cat => cat.children?.length)
  const [selectedCategory, setSelectedCategory] = useState(filteredList[0]?.category || '')
  const currentCategory = filteredList.find(cat => cat.category === selectedCategory)

  useEffect(() => {
    setActiveMemberIndex(0)
  }, [selectedCategory])

  if (!currentCategory || !currentCategory.children) return null
  const members = currentCategory.children

  return (
    <section className={`section-spacing-top ${styles.teamSection}`}>
      <div className={`container ${styles.teamContainer}`}>
        <SectionTitle className={styles.teamTitle}>Команда</SectionTitle>
        {!isMobile && (
          <Swiper
            spaceBetween={20}
            slidesPerView="auto"
            className={styles.teamTabs}
            onSwiper={setThumbsSwiper}
            freeMode
            watchSlidesProgress
            modules={[FreeMode, Thumbs]}>
            {members.map((member, index) => (
              <SwiperSlide key={index} style={{ width: 'auto' }}>
                <div
                  className={`${styles.teamTab} ${index === activeMemberIndex ? styles.teamTabActive : ''}`}
                  onClick={() => setActiveMemberIndex(index)}>
                  <div className={styles.teamTabLine}></div>
                  <span className={styles.teamTabName}>{member.fio}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <SelectMenu options={filteredList.map(item => item.category)} onChange={setSelectedCategory} />

        <Swiper
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs, Pagination]}
          slidesPerView={1}
          onSlideChange={swiper => setActiveMemberIndex(swiper.activeIndex)}
          initialSlide={activeMemberIndex}
          onSwiper={swiper => swiper.slideTo(activeMemberIndex, 0)}
          pagination={{
            clickable: true
          }}
          className="SwiperPagination">
          {members.map((member, index) => (
            <SwiperSlide key={index}>
              <div className={styles.teamContent}>
                <div className={styles.teamInfo}>
                  <SectionTitle>{member.fio}</SectionTitle>
                  <p className={styles.teamDescription}>{member.description}</p>
                </div>
                <div className={styles.teamImageWrapper}>
                  <Image src={member.img} alt={member.fio} fill />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default TeamSection
