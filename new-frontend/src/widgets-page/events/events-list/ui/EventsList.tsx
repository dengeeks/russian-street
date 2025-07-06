'use client'
import styles from './EventsList.module.css'
import ArticleCard, { ArticleCardLoaderSkeleton, ArticleCardSkeleton } from '@/entities/article-card'
import { useEventsData } from '@/shared/context/events/useEventsDataContext'
import Pagination from '@/shared/ui/Pagination'
import EmptyState from '@/shared/ui/EmptyState'
import FavoriteToggleButton from '@/features/favorite-toggle'
import { useMobileDetection } from '@/shared/hooks/useIsMobile'

const EventsList = () => {
  const { eventsData, isLoading, eventFilter, onFilterChange} = useEventsData()
  const isMobile = useMobileDetection(632)
  const skeletonCount = eventFilter.page_size
  return (
    <div className={styles.eventsListWrapper}>

      {isLoading ? (
        <div className={styles.eventsListGrid}>
          {Array.from({ length: skeletonCount}).map((_, i) => (
            <ArticleCardLoaderSkeleton key={`loader-${i}`} />
          ))}
        </div>
      ) : eventsData.results.length > 0 ? (
        <div className={styles.eventsListGrid}>
          {eventsData.results.map(event => (
            <ArticleCard
              key={event.id}
              {...event}
              linkPath={`/events/${event.id}?type=${eventFilter.type}`}
            >
              <FavoriteToggleButton
                initial={event.is_favorite}
                type="event"
                objectId={event.id}
              />
            </ArticleCard>
          ))}
          {!isMobile &&
          Array.from({ length: Math.max(0, skeletonCount - eventsData.results.length) }).map((_, index) => (
            <ArticleCardSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Нет мероприятий :("
          description="К сожалению, по выбранным параметрам мы ничего не нашли. Попробуйте выбрать другие или возвращайтесь на главную страницу."
        />
      )}

      {eventsData.total_pages > 1 && <Pagination  page={eventFilter.page}
                                                   total={eventsData.total_pages}
                                                   onChange={(newPage) => onFilterChange('page', newPage)}/>}
    </div>
  )
}

export default EventsList
