import styles from './OurProjects.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import SelectMenu from '@/shared/ui/SelectMenu'
import ArticleCard from '@/entities/article-card'

const OurProjects = () => {
  return (
    <section className={`container section-spacing-bottom ${styles.projectsSection}`}>
      <div className={styles.projectsHeader}>
        <SectionTitle>Наши проекты</SectionTitle>
          <SelectMenu options={['dawdaw', 'awdawdaw']} />
      </div>
      <div className={styles.projectsGrid}>
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
    </section>
  )
}

export default OurProjects
