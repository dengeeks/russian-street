import styles from './PostList.module.css'
import ArticleCard, { ArticleCardSkeleton } from '@/entities/article-card'

const PostList = () => {
  return (
    <section className={`container section-spacing-top ${styles.postListGrid}`}>
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCardSkeleton />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
    </section>
  )
}

export default PostList
