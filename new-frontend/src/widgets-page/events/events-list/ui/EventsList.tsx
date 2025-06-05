import styles from "./EventsList.module.css";
import ArticleCard from '@/entities/article-card'

const EventsList = () => {
  return (
    <div className={styles.eventsListGrid}>
      {Array.from({ length: 9 }, (_, i) => (
        <ArticleCard key={i} />
      ))}
    </div>
  )
}

export default EventsList;