import { SubmitHandler, UseFormSetError } from 'react-hook-form'
import type {FeedbackType} from "./type"
import {postFeedbackQuestion} from "@/shared/api/feedback/postFeedbackQuestion"
import { useToast } from '@/shared/context/toast/useToastContext'
import { useServerFieldErrors } from '@/shared/hooks/useServerFieldErrors'

type useFeedbackReturn = {
  onSubmit: SubmitHandler<FeedbackType>;
  hasManualError: boolean;
  setHasManualError: (val: boolean) => void;
}

export const useFeedback = (setError: UseFormSetError<FeedbackType>, reset: () => void): useFeedbackReturn => {
  const { hasManualError, setHasManualError, handleServerError } = useServerFieldErrors<FeedbackType>()
  const { showToast } = useToast()

  const onSubmit: SubmitHandler<FeedbackType> = async formData => {
    setHasManualError(false)
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { agreement, ...dataToSend } = formData
      const { data, status } = await postFeedbackQuestion(dataToSend)

      if (status === 201) {
        showToast('Ваша заявка принята! Спасибо за обратную связь.', 'success')
        reset()
      } else if (status === 429) {
        showToast('Вы превысили лимит заявок. Пожалуйста, попробуйте снова через час.', 'invalid')
        reset()
      } else {
        if (handleServerError(data, setError)) {
          return
        }
      }
    } catch {
      setHasManualError(true)
      showToast('Произошла ошибка, попробуйте позже.', 'invalid')
    }
  }

  return {
    onSubmit,
    hasManualError,
    setHasManualError
  }
}
