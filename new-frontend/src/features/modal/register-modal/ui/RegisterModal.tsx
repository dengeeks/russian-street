'use client'
import Button from '@/shared/ui/Button'
import FormField from '@/shared/ui/FormField'
import { SubmitHandler, useForm } from 'react-hook-form'
import {RegisterUserType} from "../model/type"
import { emailValidation, first_nameValidation, passwordValidation } from '@/shared/validation/validators'
import CheckBox from '@/shared/ui/CheckBox'
import useModal from '@/shared/store/modal'
import Link from 'next/link'
import Modal from '@/shared/ui/Modal'
import { postRegister } from '@/shared/api/user/postRegister'
import { useToast } from '@/shared/context/toast/useToastContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const RegisterModal = () => {
  const [hasManualEmailError, setHasManualEmailError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<RegisterUserType>({
    mode: 'onChange',
  });

  const {openModal, closeModal} = useModal();
  const {showToast} = useToast()
  const router = useRouter()

  const onSubmit: SubmitHandler<RegisterUserType> = async data => {
    setHasManualEmailError(false);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { agreement, memberRightsAgreement, ...formData } = data;
      const response = await postRegister(formData);
      if (response?.email && response.email.length > 0) {
        // Проверка на ошибку с email
        setError('email', {
          type: 'manual',
          message: response.email[0],
        });
        setHasManualEmailError(true);
        showToast(response.email[0], 'invalid');
        return;
      }
      // Если регистрация прошла успешно, перенаправляем пользователя
      router.push("/profile");
      closeModal()
      showToast('Вы успешно зарегистрированы!', 'success');
    } catch {
      showToast('Произошла ошибка при регистрации.', 'error');
    }
  };


  return (
    <Modal onClose={closeModal}>
    <form onSubmit={handleSubmit(onSubmit)} className="form--modal">
      <h2 className="form--modal__title">Зарегистрироваться</h2>
      <div className="form--modal__body">
          <FormField
            {...register('first_name', first_nameValidation)}
            error={errors.first_name?.message}
            label="Имя"
            name="first_name"
            type="text"
            required
            placeholder="Ваше имя"
            hint="Можно изменить в личном кабинете"
            theme="dark"
          />
          <FormField
            {...register('email', {
              required: 'Обязательное поле',
              ...emailValidation,
              onChange: () => setHasManualEmailError(false),
            })}
            error={errors.email?.message}
            label="Email"
            name="email"
            required
            placeholder="example@mail.ru"
            hint="Можно изменить в личном кабинете"
            theme="dark"
          />

          <FormField
            {...register('password', passwordValidation)}
            error={errors.password?.message}
            label="Пароль"
            required
            type="password"
            name="password"
            placeholder="Придумайте пароль"
            theme="dark"
          />
        <CheckBox
          id="member-rights-agreement-register"
          {...register('memberRightsAgreement', {
            required: 'Необходимо согласие с правами и обязанностями'
          })}
          error={errors.memberRightsAgreement?.message}
          theme="dark"
        >
          Я согласен с <Link href="/" className="modal--form__link">правами и обязанностями члена ООО УКС «Улицы России»</Link>
        </CheckBox>
        <CheckBox
          id="agreement-with-personal-info-register"
          {...register('agreement', {
            required: 'Необходимо согласие на обработку персональных данных'
          })}
          error={errors.agreement?.message}
          theme="dark"
        >
          Я согласен (на) <Link href="/" className="modal--form__link">на обработку персональных данных</Link>
        </CheckBox>

      </div>

      <div className="form--modal__actions form--modal__actions--column">
        <Button type="submit" className="red" disabled={hasManualEmailError || isSubmitting}>
          зарегистрироваться
        </Button>
        <Button className="outlined" onClick={() => openModal('login-user')}>
          войти
        </Button>
      </div>
    </form>
    </Modal>
  )
}

export default RegisterModal
