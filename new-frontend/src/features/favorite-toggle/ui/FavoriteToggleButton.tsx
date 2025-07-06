'use client'
import { useFavoriteToggle } from '../model/useFavoriteToggle'
import Icon from '@/shared/icon'
import styles from './FavoriteToggleButton.module.css'

interface Props {
  initial: boolean
  type: 'event' | 'area'
  objectId: string
}

const FavoriteToggleButton = ({ initial, type, objectId }: Props) => {
  const { isFavorite, toggleFavorite, loading } = useFavoriteToggle(initial, type, objectId)

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
