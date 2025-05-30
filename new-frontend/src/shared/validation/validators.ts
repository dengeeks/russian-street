export const emailValidation = {
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Введите корректный email',
  },
};

export const phoneValidation = {
  pattern: {
    value: /^(\+7|8)\s?\d{3}\s?\d{3}-?\d{2}-?\d{2}$/,
    message: 'Введите корректный номер (например, +7 923 567-89-90)',
  },
};

export const passwordValidation = {
  required: 'Пароль обязателен',
  minLength: {
    value: 8,
    message: 'Минимальная длина пароля — 8 символов',
  },
  validate: (value: string) => {
    const hasUpper = /[A-ZА-Я]/.test(value)
    const hasLower = /[a-zа-я]/.test(value)
    const hasDigit = /\d/.test(value)

    if (!hasUpper) return 'Добавьте хотя бы одну заглавную букву'
    if (!hasLower) return 'Добавьте хотя бы одну строчную букву'
    if (!hasDigit) return 'Добавьте хотя бы одну цифру'
    return true
  }
}