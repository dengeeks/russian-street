'use client'
import dynamic from 'next/dynamic'
import Loader from '@/shared/ui/Loader'

import styles from './FavoriteAndParticipated.module.css'
import ProfileParticipationCard from '@/entities/profile/profile-participation-card'
import { useFavoriteList } from '@/widgets-page/profile/user-events/model/useFavoriteList'
import EventPlaceToggle from '@/features/event-place-toggle'
import { useState } from 'react'
import type { FavoriteFilterType } from '@/shared/api/favorite/list/type'
import Pagination from '@/shared/ui/Pagination'


const EmptyFavoritesAndParticipated = dynamic(
  () => import('../EmptyFavoritesAndParticipated'),
  {
    loading: () => <Loader/>,
    ssr: false,
  }
)

const INITIAL_FILTER: FavoriteFilterType = {
  page: 1,
  page_size: 6,
  type: 'event',
}


const FavoriteAndParticipated = () => {
  const [favoriteFilter, setFavoriteFilter] = useState<FavoriteFilterType>(INITIAL_FILTER)
  const { favoriteList } = useFavoriteList(favoriteFilter)

  return (
    <div className={styles.favPartRoot} id="pagination-scroll">
      <div className={styles.favPartHeader}>
        <div className={styles.favPartTabs}>
          <div className={`${styles.favPartTab}`}>Ты зарегистрирован</div>
          <div className={`${styles.favPartTab} ${styles.favPartTabActive}`}>Твои избранные</div>
        </div>
        <EventPlaceToggle
          value={favoriteFilter.type}
          onChange={newType =>
            setFavoriteFilter(prev => ({
              ...prev,
              type: newType,
              page: 1
            }))
          }
        />
      </div>
      <div className={styles.favPartCards}>
        {favoriteList.results.length === 0 ? (
          <EmptyFavoritesAndParticipated type={favoriteFilter.type} text={`добавил ${favoriteFilter.type === 'event' ? 'мероприятия' : 'площадки'} в избранное`} />
        ) : (
          favoriteList.results.map(favorite => (
            <ProfileParticipationCard key={favorite.id} {...favorite} type={favoriteFilter.type} />
          ))
        )}
      </div>
      {favoriteList.total_pages > 1 && (
      <Pagination total={favoriteList.total_pages} page={favoriteFilter.page} onChange={(newPage) =>
        setFavoriteFilter((prev) => ({
          ...prev,
          page: newPage,
        }))
      }/>
        )}
    </div>
  )
}

export default FavoriteAndParticipated
