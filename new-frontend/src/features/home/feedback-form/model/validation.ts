import { RegisterOptions } from 'react-hook-form'
import { FeedbackType } from './type'

export const messageValidation: RegisterOptions<FeedbackType, 'message'> = {
  maxLength: {
    value: 500,
    message: 'Сообщение не должно превышать 500 символов'
  }
}