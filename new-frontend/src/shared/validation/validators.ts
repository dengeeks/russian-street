export const emailValidation = {
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Введите корректный email',
  },
};

export const phoneValidation = {
  pattern: {
    value: /^(?:\+7|7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
    message: 'Введите корректный номер (например, +7 923 567-89-90)',
  },
};

export const passwordValidation = {
  required: 'Пароль обязателен',
  minLength: {
    value: 8,
    message: 'Минимальная длина пароля — 8 символов',
  },
}

export const first_nameValidation = {
  maxLength: {
    value: 15,
    message: 'Максимальная длина имени — 15 символов',
  },
};

export const last_nameValidation = {
  maxLength: {
    value: 25,
    message: 'Максимальная длина фамилий — 25 символов',
  },
};


export const middle_nameValidation = {
  maxLength: {
    value: 25,
    message: 'Максимальная длина отчества — 25 символов',
  },
};
