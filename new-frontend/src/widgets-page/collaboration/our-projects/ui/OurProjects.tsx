'use client'
import styles from './OurProjects.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import SelectMenu from '@/shared/ui/SelectMenu'
import ArticleCard from '@/entities/article-card'
import { useRegionList } from '@/shared/hooks/filter/useRegionList'

const OurProjects = () => {
  const {regions} = useRegionList()
  return (
    <section className={`container section-spacing-bottom ${styles.projectsSection}`}>
      <div className={styles.projectsHeader}>
        <SectionTitle>Наши проекты</SectionTitle>
        {regions && regions.length > 0 && (
          <SelectMenu value={regions[0].id} options={regions} placeholder="ВЫБРАТЬ РЕГИОН" searchable/>
          )}
      </div>
      <div className={styles.projectsGrid}>
        {Array.from({ length: 6 }).map((_, index) => (
          <ArticleCard key={index} id="1" title="Соревнования по скейтбордингу" city="Сыктывкар" starting_date="2025-07-03T09:28:15+03:00" card_image="/assets/test/event.png"/>
        ))}
      </div>
    </section>
  )
}

export default OurProjects
