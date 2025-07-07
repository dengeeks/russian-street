import { useState } from 'react'
import { postFavoriteAddDelete } from '@/shared/api/favorite/add-delete/postFavoriteAddDelete'
import { useToast } from '@/shared/context/toast/useToastContext'
import { EventOrAreaType } from '@/shared/api/type'

export function useFavoriteToggle(initial: boolean, type: EventOrAreaType, objectId: string) {
  const [isFavorite, setIsFavorite] = useState(initial)
  const [loading, setLoading] = useState(false)

  const {showToast} = useToast()

  const toggleFavorite = async () => {
    setLoading(true)
    try {
      const res = await postFavoriteAddDelete(type, objectId)
      if (res.status === 200) {
        setIsFavorite(res.data.is_favorite)
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
