import { useState } from 'react'
import { postFavoriteAddDelete } from '@/shared/api/event-or-area/favorite/postFavoriteAddDelete'
import { useToast } from '@/shared/context/toast/useToastContext'

export function useFavoriteToggle(initial: boolean, type: 'event' | 'area', objectId: string) {
  const [isFavorite, setIsFavorite] = useState(initial)
  const [loading, setLoading] = useState(false)

  const {showToast} = useToast()

  const toggleFavorite = async () => {
    setLoading(true)
    try {
      const res = await postFavoriteAddDelete(type, objectId)
      if (res.status === 200) {
        setIsFavorite(res.data.is_favorite)
        showToast(res.data.detail, 'success')
      }

    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, 'invalid')
      } else {
        showToast('Произошла ошибка', 'error')
      }

    } finally {
      setLoading(false)
    }
  }

  return {
    isFavorite,
    toggleFavorite,
    loading,
  }
}
