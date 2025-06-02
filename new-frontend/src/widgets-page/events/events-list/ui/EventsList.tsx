import styles from "./EventsList.module.css";
import ArticleCard from '@/entities/article-card'

const EventsList = () => {
  return (
    <div className={styles.eventsListGrid}>
      <ArticleCard/>
      <ArticleCard/>
      <ArticleCard/>
      <ArticleCard/>
      <ArticleCard/>
      <ArticleCard/>
      <ArticleCard/>
      <ArticleCard/>
      <ArticleCard/>

    </div>
  )
}

export default EventsList;