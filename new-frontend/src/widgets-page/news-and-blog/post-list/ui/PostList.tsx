'use client'
import styles from './PostList.module.css'
import ArticleCard, { ArticleCardSkeleton, ArticleCardLoaderSkeleton} from '@/entities/article-card'
import PostCardLarge, {PostCardLargeSkeleton} from '@/widgets-page/news-and-blog/post-card-large'
import { useBlogData } from '@/shared/context/blog/useBlogDataContext'
import EmptyState from '@/shared/ui/EmptyState'
import Pagination from '@/shared/ui/Pagination'
import { useMobileDetection } from '@/shared/hooks/useIsMobile'

const PostList = () => {
  const { blogListData, blogFilters, onFilterChange, isLoading } = useBlogData()
  const isMobile = useMobileDetection(632)
  const [firstPost, ...restPosts] = blogListData.results;
  const totalCount = blogFilters.page_size

  return (
    <>
      {isLoading ? (
        <PostCardLargeSkeleton />
      ) : (
        firstPost && (
          <PostCardLarge
            title={firstPost.title}
            city={firstPost.city}
            date={firstPost.created_at}
            media={firstPost.card_image}
            id={firstPost.id}
          />
        )
      )}

      <section className={`container section-spacing-top section-spacing-bottom ${styles.postListWrapper}`} id="pagination-scroll">
        {isLoading ? (
          <div className={styles.postListGrid}>
            {Array.from({ length: totalCount - 1 }).map((_, i) => (
              <ArticleCardLoaderSkeleton key={`loader-${i}`} />
            ))}
          </div>
        ) : blogListData.results.length > 0 ? (
          <div className={styles.postListGrid}>
            {restPosts.map(blog => (
              <ArticleCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                city={blog.city}
                starting_date={blog.created_at}
                card_image={blog.card_image}
                linkPath={`blog/${blog.id}`}
              />
            ))}
            {!isMobile &&
              Array.from({ length: totalCount - blogListData.results.length }).map((_, i) => (
                <ArticleCardSkeleton key={`skeleton-${i}`} />
              ))}
          </div>
        ) : (
          <EmptyState
            title="Пока у нас нет новостей :("
            description="Они обязательно скоро появятся, а пока вы можете вернуться на главную страницу."
          />
        )}
        {blogListData.total_pages > 1 && (
          <Pagination
            page={blogFilters.page}
            total={blogListData.total_pages}
            onChange={newPage => onFilterChange('page', newPage)}
          />
        )}
      </section>
    </>
  )
}

export default PostList
