import React, { useState, useEffect } from 'react';
import './Popupreg.css';
import ClosePopupBtn from '../../images/closepopupbtn.svg';
import { SuccessMessage } from './SuccessMessage';
import { postRegister, UserAccount } from '../../utils/LogRegApi/LogRegapi';

interface RegpopupProps {
  closePopup: () => void;
  isOpen: boolean;
  openLoginPopup: () => void;
}

export function Regpopup({ closePopup, isOpen, openLoginPopup }: RegpopupProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isStep1Valid, setIsStep1Valid] = useState(false);
  const [isStep2Valid, setIsStep2Valid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    surname: '',
    name: '',
    patronymic: '',
    phone: '',
    dob: '',
    email: '',
    city: 'Moscow',
    passport_series: '',
    passport_number: '',
    issued_by: '',
    issue_date: '',
    gender: 'М',
    agreement1: true,
    agreement2: true,
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      resetForm();
      setCurrentStep(1);
    }
  }, [isOpen]);

  useEffect(() => {
    validateForm();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [formData, closePopup]);

  const resetForm = () => {
    setFormData({
      surname: '',
      name: '',
      patronymic: '',
      phone: '',
      dob: '',
      email: '',
      city: 'Moscow',
      passport_series: '',
      passport_number: '',
      issued_by: '',
      issue_date: '',
      gender: 'М',
      agreement1: true,
      agreement2: true,
    });
    setFormErrors({});
    setIsStep1Valid(false);
    setIsStep2Valid(false);
    setIsSubmitted(false);
    setShowSuccessMessage(false);
    setIsLoading(false);
  };

  const validateField = (name: string, value: string | boolean) => {
    const errors: { [key: string]: string } = { ...formErrors };
    switch (name) {
      case 'surname':
      case 'name':
        if (!/^[А-ЯЁ][а-яё]*$/.test(value as string)) {
          errors[name] = `${name === 'surname' ? 'Фамилия' : 'Имя'} должно начинаться с заглавной буквы и содержать только кириллические буквы`;
        } else if ((value as string).length < 2) {
          errors[name] = `${name === 'surname' ? 'Фамилия' : 'Имя'} должно быть не короче 2 символов`;
        } else {
          delete errors[name];
        }
        break;
      case 'patronymic':
        if (value && !/^[А-ЯЁ][а-яё]*$/.test(value as string)) {
          errors.patronymic = 'Отчество должно начинаться с заглавной буквы и содержать только кириллические буквы';
        } else if (value && (value as string).length < 2) {
          errors.patronymic = 'Отчество должно быть не короче 2 символов';
        } else {
          delete errors.patronymic;
        }
        break;
      case 'phone':
        if (!/^\+7\d{10}$/.test(value as string)) {
          errors.phone = 'Номер телефона должен начинаться с +7 и содержать 10 цифр после кода страны';
        } else {
          delete errors.phone;
        }
        break;
      case 'passport_series':
        if (!/^\d{4}$/.test(value as string)) {
          errors.passport_series = 'Серия паспорта должна содержать ровно 4 цифры';
        } else {
          delete errors.passport_series;
        }
        break;
      case 'passport_number':
        if (!/^\d{6}$/.test(value as string)) {
          errors.passport_number = 'Номер паспорта должен содержать ровно 6 цифр';
        } else {
          delete errors.passport_number;
        }
        break;
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value as string)) {
          errors.email = 'Неверный формат электронной почты';
        } else {
          delete errors.email;
        }
        break;
      case 'issued_by':
        if (!/^[А-Яа-яЁё\s]+$/.test(value as string)) {
          errors.issued_by = 'Кем выдано должно содержать только кириллические буквы';
        } else {
          delete errors.issued_by;
        }
        break;
      case 'dob':
        if (!value) {
          errors.dob = 'Дата рождения обязательна';
        } else {
          delete errors.dob;
        }
        break;
      case 'issue_date':
        if (!value) {
          errors.issue_date = 'Дата выдачи обязательна';
        } else {
          delete errors.issue_date;
        }
        break;
      case 'agreement1':
        if (!value) {
          errors.agreement1 = 'Необходимо согласие с правами и обязанностями члена ООО УКС «Улицы России»';
        } else {
          delete errors.agreement1;
        }
        break;
      case 'agreement2':
        if (!value) {
          errors.agreement2 = 'Необходимо согласие на обработку персональных данных';
        } else {
          delete errors.agreement2;
        }
        break;
      default:
        break;
    }
    setFormErrors(errors);
  };

  const validateForm = () => {
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key as keyof typeof formData]);
    });
    const isStep1Valid = (
      formData.surname &&
      formData.name &&
      formData.phone &&
      formData.dob &&
      formData.email &&
      Object.keys(formErrors).length === 0
    );
    const isStep2Valid = (
      formData.passport_series &&
      formData.passport_number &&
      formData.issue_date &&
      formData.issued_by &&
      formData.agreement1 &&
      formData.agreement2 &&
      Object.keys(formErrors).length === 0
    );
    setIsStep1Valid(!!isStep1Valid);
    setIsStep2Valid(!!isStep2Valid);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
    validateField(name, newValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    validateField(name, newValue);
    validateForm();
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm();
    if (isStep2Valid) {
      const userData: UserAccount = {
        email: formData.email,
        first_name: formData.name,
        last_name: formData.surname,
        middle_name: formData.patronymic || '', // Отчество может быть пустым
        date_of_birth: formData.dob,
        phone_number: formData.phone,
        city: formData.city,
        passport_series: formData.passport_series,
        passport_number: formData.passport_number,
        passport_issue_date: formData.issue_date,
        passport_issued_by: formData.issued_by,
        consent_to_rights: formData.agreement1,
        consent_to_processing: formData.agreement2,
      };

      try {
        setIsLoading(true);
        const response = await postRegister(userData);
        setIsLoading(false);
        setIsSubmitted(true);
        setShowSuccessMessage(true);
        closePopup();
      } catch (error) {
        setIsLoading(false);
        if (error instanceof Error) {
          console.error('Детали ошибки:', error);
          alert('Ошибка регистрации: ' + error.message);
        } else {
          alert('Ошибка регистрации: Произошла неизвестная ошибка');
        }
      }
    } else {
      alert('Пожалуйста, заполните все поля правильно.');
    }
  };

  const handleGovLogin = () => {
    console.log('Вход через Госуслуги');
  };

  if (!isOpen && !isSubmitted) return null;

  return (
    <>
      <div className={`Regpopup ${isOpen ? 'Regpopup_active' : ''}`}>
        <div className='Regpopup__content'>
          <button className='Regpopup__close' onClick={closePopup}>
            <img src={ClosePopupBtn} alt='Закрыть' />
          </button>
          {!isSubmitted ? (
            <>
              <div className='Regpopup__steps'>
                <span
                  className={`Regpopup__step ${currentStep === 1 ? 'active' : ''}`}
                  onClick={() => handleStepClick(1)}
                >
                  Шаг 1
                </span>
                <span
                  className={`Regpopup__step ${currentStep === 2 ? 'active' : ''}`}
                  onClick={() => handleStepClick(2)}
                >
                  Шаг 2
                </span>
              </div>
              <h2 className='Regpopup__title'>{currentStep === 1 ? 'Контактные данные*' : 'Паспортные данные*'}</h2>
              <form className='Regpopup__form' onSubmit={handleSubmit}>
                {currentStep === 1 && (
                  <div className='Regpopup__section'>
                    <div className={`Regpopup__field Regpopup__field--small ${formErrors.surname ? 'Regpopup__field--error' : ''}`}>
                      <label className='Regpopup__label' htmlFor='surname'>Фамилия</label>
                      <input
                        type='text'
                        id='surname'
                        name='surname'
                        className={`Regpopup__input ${formErrors.surname ? 'Regpopup__input--error' : ''}`}
                        placeholder='Иванов'
                        value={formData.surname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {formErrors.surname ? (
                        <span className='Regpopup__error'>{formErrors.surname}</span>
                      ) : (
                        <span className='Regpopup__hint'>Только на кириллице, не короче 2 символов</span>
                      )}
                    </div>
                    <div className={`Regpopup__field Regpopup__field--small ${formErrors.name ? 'Regpopup__field--error' : ''}`}>
                      <label className='Regpopup__label' htmlFor='name'>Имя</label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        className={`Regpopup__input ${formErrors.name ? 'Regpopup__input--error' : ''}`}
                        placeholder='Иван'
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {formErrors.name ? (
                        <span className='Regpopup__error'>{formErrors.name}</span>
                      ) : (
                        <span className='Regpopup__hint'>Только на кириллице, не короче 2 символов</span>
                      )}
                    </div>
                    <div className={`Regpopup__field Regpopup__field--medium ${formErrors.patronymic ? 'Regpopup__field--error' : ''}`}>
                      <label className='Regpopup__label' htmlFor='patronymic'>Отчество</label>
                      <input
                        type='text'
                        id='patronymic'
                        name='patronymic'
                        className={`Regpopup__input ${formErrors.patronymic ? 'Regpopup__input--error' : ''}`}
                        placeholder='Иванович'
                        value={formData.patronymic}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {formErrors.patronymic ? (
                        <span className='Regpopup__error'>{formErrors.patronymic}</span>
                      ) : (
                        <span className='Regpopup__hint'>Если нет отчества, оставьте поле пустым</span>
                      )}
                    </div>
                    <div className='Regpopup__field Regpopup__field--gender'>
                      <label className='Regpopup__label' htmlFor='gender'>Пол</label>
                      <select
                        id='gender'
                        name='gender'
                        className='Regpopup__select'
                        value={formData.gender}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      >
                        <option value='М' className='Regpopup__select-value'>M</option>
                        <option value='Ж' className='Regpopup__select-value'>F</option>
                      </select>
                    </div>
                    <div className={`Regpopup__field Regpopup__field--small ${formErrors.dob ? 'Regpopup__field--error' : ''}`}>
                      <label className='Regpopup__label' htmlFor='dob'>Дата рождения</label>
                      <input
                        type='date'
                        id='dob'
                        name='dob'
                        className={`Regpopup__input ${formErrors.dob ? 'Regpopup__input--error' : ''}`}
                        value={formData.dob}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {formErrors.dob ? (
                        <span className='Regpopup__error'>{formErrors.dob}</span>
                      ) : (
                        <span className='Regpopup__hint'>В формате дд.мм.гггг</span>
                      )}
                    </div>
                    <div className={`Regpopup__field Regpopup__field--small ${formErrors.phone ? 'Regpopup__field--error' : ''}`}>
                      <label className='Regpopup__label' htmlFor='phone'>Номер телефона</label>
                      <input
                        type='tel'
                        id='phone'
                        name='phone'
                        className={`Regpopup__input ${formErrors.phone ? 'Regpopup__input--error' : ''}`}
                        placeholder='+7 923 567-89-90'
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {formErrors.phone ? (
                        <span className='Regpopup__error'>{formErrors.phone}</span>
                      ) : (
                        <span className='Regpopup__hint'>Только номера РФ</span>
                      )}
                    </div>
                    <div className={`Regpopup__field Regpopup__field--large ${formErrors.email ? 'Regpopup__field--error' : ''}`}>
                      <label className='Regpopup__label' htmlFor='email'>Почта</label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        className={`Regpopup__input ${formErrors.email ? 'Regpopup__input--error' : ''}`}
                        placeholder='ivan@gmail.com'
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {formErrors.email ? (
                        <span className='Regpopup__error'>{formErrors.email}</span>
                      ) : (
                        <span className='Regpopup__hint'>Пришлём код подтверждения</span>
                      )}
                    </div>
                    <div className={`Regpopup__field Regpopup__field--city ${formErrors.city ? 'Regpopup__field--error' : ''}`}>
                      <label className='Regpopup__label' htmlFor='city'>Город</label>
                      <select
                        id='city'
                        name='city'
                        className='Regpopup__select'
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      >
                        <option value='Moscow'>Москва</option>
                        <option value='Saint Petersburg'>Санкт-Петербург</option>
                        <option value='Novosibirsk'>Новосибирск</option>
                        <option value='Ekaterinburg'>Екатеринбург</option>
                        <option value='Nizhny Novgorod'>Нижний Новгород</option>
                      </select>
                      {formErrors.city ? (
                        <span className='Regpopup__error'>{formErrors.city}</span>
                      ) : (
                        <span className='Regpopup__hint'>Введите вручную или выберите из списка</span>
                      )}
                    </div>
                    <div className='Regpopup__buttons'>
                      <button type='button' className='Regpopup__button Regpopup__button--gov' onClick={handleGovLogin}>ВОЙТИ ЧЕРЕЗ ГОСУСЛУГИ</button>
                      <button type='button' className={`Regpopup__button ${isStep1Valid ? 'Regpopup__button--register' : 'Regpopup__button--disabled'}`} disabled={!isStep1Valid} onClick={() => handleStepClick(2)}>
                        ПРОДОЛЖИТЬ
                      </button>
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className='Regpopup__section'>
                    <div className={`Regpopup__field Regpopup__field--small ${formErrors.passport_series ? 'Regpopup__field--error' : ''}`}>
                      <label className='Regpopup__label' htmlFor='passport_series'>Серия паспорта</label>
                      <input
                        type='text'
                        id='passport_series'
                        name='passport_series'
                        className={`Regpopup__input ${formErrors.passport_series ? 'Regpopup__input--error' : ''}`}
                        placeholder='1234'
                        value={formData.passport_series}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={4}
                        required
                      />
                      {formErrors.passport_series ? (
                        <span className='Regpopup__error'>{formErrors.passport_series}</span>
                      ) : (
                        <span className='Regpopup__hint'>4 цифры серии паспорта</span>
                      )}
                    </div>
                    <div className={`Regpopup__field Regpopup__field--small ${formErrors.passport_number ? 'Regpopup__field--error' : ''}`}>
                      <label className='Regpopup__label' htmlFor='passport_number'>Номер паспорта</label>
                      <input
                        type='text'
                        id='passport_number'
                        name='passport_number'
                        className={`Regpopup__input ${formErrors.passport_number ? 'Regpopup__input--error' : ''}`}
                        placeholder='567890'
                        value={formData.passport_number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={6}
                        required
                      />
                      {formErrors.passport_number ? (
                        <span className='Regpopup__error'>{formErrors.passport_number}</span>
                      ) : (
                        <span className='Regpopup__hint'>6 цифр номера паспорта</span>
                      )}
                    </div>
                    <div className={`Regpopup__field Regpopup__field--small ${formErrors.issue_date ? 'Regpopup__field--error' : ''}`}>
                      <label className='Regpopup__label' htmlFor='issue_date'>Дата выдачи</label>
                      <input
                        type='date'
                        id='issue_date'
                        name='issue_date'
                        className={`Regpopup__input ${formErrors.issue_date ? 'Regpopup__input--error' : ''}`}
                        value={formData.issue_date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {formErrors.issue_date ? (
                        <span className='Regpopup__error'>{formErrors.issue_date}</span>
                      ) : (
                        <span className='Regpopup__hint'>В формате дд.мм.гггг</span>
                      )}
                    </div>
                    <div className={`Regpopup__field Regpopup__field--big ${formErrors.issued_by ? 'Regpopup__field--error' : ''}`}>
                      <label className='Regpopup__label' htmlFor='issued_by'>Кем выдан</label>
                      <input
                        type='text'
                        id='issued_by'
                        name='issued_by'
                        className={`Regpopup__input ${formErrors.issued_by ? 'Regpopup__input--error' : ''}`}
                        placeholder='ОУФМС по Московской области в г. Москва'
                        value={formData.issued_by}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {formErrors.issued_by ? (
                        <span className='Regpopup__error'>{formErrors.issued_by}</span>
                      ) : (
                        <span className='Regpopup__hint'>Только кириллица</span>
                      )}
                    </div>
                    <div className='Regpopup__agreements'>
                      <div className='Regpopup__agreement'>
                        <input
                          type='checkbox'
                          id='agreement1'
                          name='agreement1'
                          className='Regpopup__checkbox'
                          checked={formData.agreement1}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                        <label htmlFor='agreement1'>Я согласен с правами и обязанностями члена ООО УКС «Улицы России»</label>
                      </div>
                      <div className='Regpopup__agreement'>
                        <input
                          type='checkbox'
                          id='agreement2'
                          name='agreement2'
                          className='Regpopup__checkbox'
                          checked={formData.agreement2}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                        <label htmlFor='agreement2'>Я согласен (на) на обработку персональных данных</label>
                      </div>
                    </div>
                    <div className='Regpopup__buttons'>
                      <button type='button' className='Regpopup__button Regpopup__button--gov' onClick={handleGovLogin}>ВОЙТИ ЧЕРЕЗ ГОСУСЛУГИ</button>
                      <button type='submit' className={`Regpopup__button ${isStep2Valid ? 'Regpopup__button--register' : 'Regpopup__button--disabled'}`} disabled={!isStep2Valid}>
                        {isLoading ? 'Регистрация...' : 'ЗАРЕГИСТРИРОВАТЬСЯ'}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </>
          ) : null}
        </div>
      </div>
      {showSuccessMessage && (
        <SuccessMessage
          isOpen={showSuccessMessage}
          onLoginClick={() => {
            setShowSuccessMessage(false);
            openLoginPopup();
          }}
          onHomeClick={() => {
            setShowSuccessMessage(false);
            closePopup();
          }}
        />
      )}
    </>
  );
}
