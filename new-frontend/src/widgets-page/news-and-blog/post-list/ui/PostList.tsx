import styles from './PostList.module.css'
import ArticleCard from '@/entities/article-card'

const PostList = () => {
  return (
    <section className={`container section-spacing-top section-spacing-bottom ${styles.postListGrid}`}>
      {Array.from({ length: 9 }, (_, i) => (
        <ArticleCard key={i} />
      ))}
    </section>
  )
}

export default PostList
