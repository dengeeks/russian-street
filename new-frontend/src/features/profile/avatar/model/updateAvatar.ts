import { ChangeEvent } from 'react'
import { patchUserUpdate } from '@/shared/api/user/patchUserUpdate'
import { useToast } from '@/shared/context/toast/useToastContext'
import { useGlobalData } from '@/shared/context/global-data/useGlobalDataContext'

export function useUpdateAvatar() {
  const { showToast } = useToast()
  const { updateUserData } = useGlobalData()

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('avatar', file)

    const { status, data } = await patchUserUpdate(formData);

    if (status === 200) {
      const previewUrl = URL.createObjectURL(file)

      updateUserData({ avatar: previewUrl })
      showToast(data.message, 'success')
    } else {
      showToast(data.message || data.detail, 'invalid')

    }
  }

  return {
    handleFileChange,
  }
}
