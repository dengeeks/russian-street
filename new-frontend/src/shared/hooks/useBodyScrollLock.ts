'use client'
import { useEffect } from 'react'

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (locked) {
      document.body.classList.add('no-scroll')
      console.log('добавить')
    } else {
      document.body.classList.remove('no-scroll')
      console.log('удалить')
    }

    return () => {
      document.body.classList.remove('no-scroll')
      console.log('удалить')
    }
  }, [locked])
}
