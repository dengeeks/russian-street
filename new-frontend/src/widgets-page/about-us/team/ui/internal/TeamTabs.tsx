import styles from '../TeamSection.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Thumbs } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import { useMobileDetection } from '@/shared/hooks/useIsMobile'
import { TeamMember } from '@/shared/api/team/type'

interface TeamTabsProps {
  members: TeamMember[];
  activeMemberIndex: number
  setActiveMemberIndex: (index: number) => void
  setThumbsSwiper: (swiper: SwiperType | null) => void
}

const TeamTabs = ({ members, activeMemberIndex, setActiveMemberIndex, setThumbsSwiper }: TeamTabsProps) => {
  const isMobile = useMobileDetection()
  if (isMobile) return null
  return (
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
            <span className={styles.teamTabName}>{`${member.first_name} ${member.last_name}`}</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default TeamTabs
