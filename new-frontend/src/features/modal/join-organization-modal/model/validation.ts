export const dateValidation = {
  required: 'Дата обязательна для заполнения',
  pattern: {
    value: /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/,
    message: 'Введите корректную дату в формате дд.мм.гггг'
  }
}

export const socialValidation = {
  required: 'Укажите ссылку на социальную сеть для связи',
  maxLength: {
    value: 125,
    message: 'Максимальная длина — 125 символов',
  },
}

export const passportSeriesValidation = {
  required: 'Серия паспорта обязательна для заполнения',
  pattern: {
    value: /^\d{4}$/,
    message: 'Серия должна содержать 4 цифры'
  }
}

export const passportNumberValidation = {
  required: 'Номер паспорта обязателен для заполнения',
  pattern: {
    value: /^\d{6}$/,
    message: 'Номер должен содержать 6 цифр'
  }
}

export const passportIssuerValidation = {
  required: 'Поле «Кем выдан» обязательно для заполнения',
  maxLength: {
    value: 255,
    message: 'Максимальная длина — 255 символов',
  },
}

