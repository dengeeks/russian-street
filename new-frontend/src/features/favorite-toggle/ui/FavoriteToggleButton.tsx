'use client'
import { useFavoriteToggle } from '../model/useFavoriteToggle'
import Icon from '@/shared/icon'
import styles from './FavoriteToggleButton.module.css'
import { EventOrAreaType } from '@/shared/api/type'
import { useGlobalData } from '@/shared/context/global-data/useGlobalDataContext'

interface FavoriteToggleButtonProps {
  initial: boolean;
  type: EventOrAreaType;
  objectId: string;
}

const FavoriteToggleButton = ({ initial, type, objectId }: FavoriteToggleButtonProps) => {
  const {userData} = useGlobalData()

  const { isFavorite, toggleFavorite, loading } = useFavoriteToggle(initial, type, objectId)

  if (!userData) return null

  return (
    <button
      className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
      onClick={toggleFavorite}
      disabled={loading}
      aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
    >
      <Icon icon="favorites" width={37} height={33} />
    </button>
  )
}

export default FavoriteToggleButton
