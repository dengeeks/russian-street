import { RegisterOptions } from 'react-hook-form'
import { FeedbackType } from './type'

export const phoneValidation: RegisterOptions<FeedbackType, 'phone'> = {
  pattern: {
    value: /^(\+7|8)\d{10}$/,
    message: 'Введите корректный номер (например, +71234567890)'
  }
}

export const emailValidation: RegisterOptions<FeedbackType, 'email'> = {
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Введите корректный email'
  }
}

export const messageValidation: RegisterOptions<FeedbackType, 'message'> = {
  maxLength: {
    value: 500,
    message: 'Сообщение не должно превышать 500 символов'
  }
}