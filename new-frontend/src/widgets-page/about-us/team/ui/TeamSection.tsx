'use client'
import dynamic from 'next/dynamic'
import Loader from '@/shared/ui/Loader'
import styles from './TeamSection.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import SelectMenu from '@/shared/ui/SelectMenu'
import { useState} from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { useTeam } from '../model/useTeam'

const TeamTabs = dynamic(() => import('./internal/TeamTabs'), {
  loading: () => (<Loader/>),
  ssr: false
});

const TeamSwiper = dynamic(() => import('./internal/TeamSwiper'), {
  loading: () => (<Loader/>),
  ssr: false
});

const TeamSection = () => {
  const {
    teamList,
    members,
    setSelectedCategory,
    activeMemberIndex,
    setActiveMemberIndex,
  } = useTeam()

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)

  if (!members.length) return null

  return (
    <section className={`section-spacing-top ${styles.teamSection}`}>
      <div className={`container ${styles.teamContainer}`}>
        <SectionTitle className={styles.teamTitle}>Команда</SectionTitle>

        <TeamTabs
          members={members}
          activeMemberIndex={activeMemberIndex}
          setActiveMemberIndex={setActiveMemberIndex}
          setThumbsSwiper={setThumbsSwiper}
        />

        <SelectMenu options={teamList.map(item => item.team_type)} onChange={setSelectedCategory} />

        <TeamSwiper
          members={members}
          activeMemberIndex={activeMemberIndex}
          setActiveMemberIndex={setActiveMemberIndex}
          thumbsSwiper={thumbsSwiper}
        />
      </div>
    </section>
  )
}

export default TeamSection
