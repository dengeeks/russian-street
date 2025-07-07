'use client'
import styles from './OurProjects.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import SelectMenu from '@/shared/ui/SelectMenu'
import ArticleCard, { ArticleCardLoaderSkeleton, ArticleCardSkeleton } from '@/entities/article-card'
import { useRegionList } from '@/shared/hooks/filter/useRegionList'
import { useEventList, EventListFilterType } from '@/shared/hooks/useEventList'
import FavoriteToggleButton from '@/features/favorite-toggle'
import Pagination from '@/shared/ui/Pagination'
import { useState } from 'react'
import EmptyState from '@/shared/ui/EmptyState'
import { useMobileDetection } from '@/shared/hooks/useIsMobile'

const INITIAL_FILTER: EventListFilterType = {
  page: 1,
  page_size: 6,
  type: 'event',
  only_our_projects: true
}

const OurProjects = () => {
  const [projectFilter, setProjectFilter] = useState<EventListFilterType>(INITIAL_FILTER)
  const { regions } = useRegionList()
  const { eventList, isLoading } = useEventList(projectFilter)
  const isMobile = useMobileDetection(631)

  return (
    <section className={`container section-spacing-bottom ${styles.projectsSection}`}>
      <div className={styles.projectsHeader} id="pagination-scroll">
        <SectionTitle>Наши проекты</SectionTitle>
        {regions && regions.length > 0 && (
          <SelectMenu
            value={projectFilter.region_id}
            onChange={newRegionId =>
              setProjectFilter(prev => ({
                ...prev,
                region_id: newRegionId
              }))
            }
            options={regions}
            placeholder="ВЫБРАТЬ РЕГИОН"
            searchable
          />
        )}
      </div>
      <div className={styles.projectsContent}>
        {isLoading ? (
          <div className={styles.projectsGrid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <ArticleCardLoaderSkeleton key={`loader-${i}`} />
            ))}
          </div>
        ) : (
          <>
            {eventList.results.length > 0 ? (
              <div className={styles.projectsGrid}>
                {eventList.results.map(project => (
                  <ArticleCard key={project.id} {...project}>
                    <FavoriteToggleButton initial={project.is_favorite} type="event" objectId={project.id} />
                  </ArticleCard>
                ))}
                {!isMobile &&
                  Array.from({ length: 6 - eventList.results.length }).map((_, i) => (
                    <ArticleCardSkeleton key={`skeleton-${i}`} />
                  ))}
              </div>
            ) : (
              <EmptyState
                title="Пока у нас нет Проектов :("
                description="Они обязательно скоро появятся, а пока вы можете вернуться на главную страницу."
              />
            )}
          </>
        )}
      </div>

      {eventList.total_pages > 1 && (
        <Pagination
          total={eventList.total_pages}
          page={eventList.current_page}
          onChange={newPage =>
            setProjectFilter(prev => ({
              ...prev,
              page: newPage
            }))
          }
        />
      )}
    </section>
  )
}

export default OurProjects
