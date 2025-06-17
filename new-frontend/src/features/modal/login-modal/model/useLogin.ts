import { useRouter } from 'next/navigation'
import { SubmitHandler, UseFormSetError } from 'react-hook-form'
import { LoginType, postLogin } from '@/shared/api/user/postLogin'
import { useToast } from '@/shared/context/toast/useToastContext'
import useModal from '@/shared/store/modal'
import { useServerFieldErrors } from '@/shared/hooks/useServerFieldErrors'
import useOAuth2 from '@/shared/store/OAuth2'

type UseLoginReturn = {
  onSubmit: SubmitHandler<LoginType>
  hasManualError: boolean
  setHasManualError: (val: boolean) => void
}

export const useLogin = (setError: UseFormSetError<LoginType>): UseLoginReturn => {
  const { hasManualError, setHasManualError, handleServerError } = useServerFieldErrors<LoginType>()
  const router = useRouter()
  const { showToast } = useToast()
  const { closeModal } = useModal()
  const { toggleTriggerOAuth2 } = useOAuth2()

  const onSubmit: SubmitHandler<LoginType> = async formData => {
    setHasManualError(false)
    try {
      const { data, status } = await postLogin(formData)

      if (status === 200) {
        router.push('/profile')
        closeModal()
        toggleTriggerOAuth2()
        showToast('Вы успешно вошли в систему!', 'success')
      } else {
        if (handleServerError(data, setError)) {
          return
        }
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error && error.message ? error.message : 'Произошла ошибка при авторизации.'

      setError('email', { type: 'manual', message })
      setError('password', { type: 'manual', message })
      setHasManualError(true)
      showToast(message, 'invalid')
    }
  }

  return {
    onSubmit,
    hasManualError,
    setHasManualError
  }
}
