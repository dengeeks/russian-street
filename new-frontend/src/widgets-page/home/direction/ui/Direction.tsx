import styles from  './Direction.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import { Arrow } from '@/shared/ui/Arrow'
import DirectionSwiper from './internal/DirectionSwiper'
import { getSubDisciplines } from '@/shared/api/direction/sub-disciplines/getSubDisciplines'

const Direction = async () => {
  const directionsData = await getSubDisciplines()

  if (directionsData.length === 0) {
    return null
  }
  return (
    <section className={`container ${styles.directionHomeSection} section-spacing-top section-spacing-bottom`}>
      <div className={styles.directionHeader}>
        <SectionTitle>направления</SectionTitle>
        <div className={`${styles.directionNavWrapper} ${styles.directionTopNav} ContentShowcase`}>
          <Arrow styleClass="direction__home-prev" icon="chevron" />
          <Arrow styleClass="direction__home-next" icon="chevron" />
        </div>
      </div>
      <DirectionSwiper directionsData={directionsData}/>
      <div className={`${styles.directionNavWrapper} ${styles.directionBottomNav} ContentShowcase`}>
        <Arrow styleClass="direction__home-prev" icon="chevron" />
        <Arrow styleClass="direction__home-next" icon="chevron" />
      </div>
    </section>
  )
}

export default Direction
