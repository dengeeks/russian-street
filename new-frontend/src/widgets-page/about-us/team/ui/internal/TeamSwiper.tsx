import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination, Thumbs } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import 'swiper/css/pagination'
import TeamCard from '@/entities/about-us/team-card'
import { TeamMember } from '@/shared/api/team/type'

interface TeamSwiperProps {
  members: TeamMember[];
  activeMemberIndex: number
  setActiveMemberIndex: (index: number) => void
  thumbsSwiper: SwiperType | null
}

const TeamSwiper = ({ members, activeMemberIndex, setActiveMemberIndex, thumbsSwiper, }: TeamSwiperProps) => {
  return (
    <Swiper
      thumbs={{ swiper: thumbsSwiper }}
      modules={[FreeMode, Thumbs, Pagination]}
      slidesPerView={1}
      onSlideChange={swiper => setActiveMemberIndex(swiper.activeIndex)}
      initialSlide={activeMemberIndex}
      onSwiper={swiper => swiper.slideTo(activeMemberIndex, 0)}
      pagination={{ clickable: true }}
      className="SwiperPagination">
      {members.map(member => (
        <SwiperSlide key={member.id}>
          <TeamCard {...member} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default TeamSwiper
