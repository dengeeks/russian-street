'use client'
import Button from '@/shared/ui/Button'
import FormField from '@/shared/ui/FormField'
import { useForm } from 'react-hook-form'
import { emailValidation, passwordValidation } from '@/shared/validation/validators'
import useModal from '@/shared/store/modal'
import Modal from '@/shared/ui/Modal'
import { LoginType} from '@/shared/api/user/postLogin'
import { useLogin } from '../model/useLogin'

const LoginModal = () => {
  const { register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<LoginType>({
    mode: 'onChange',
  });

  const {openModal, closeModal} = useModal();

  const { onSubmit, hasManualEmailError, setHasManualEmailError} = useLogin(setError);

  return (
    <Modal onClose={closeModal}>
    <form onSubmit={handleSubmit(onSubmit)} className="form--modal">
      <h2 className="form--modal__title">Войти</h2>
      <div className="form--modal__body">
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
          name="password"
          placeholder="Придумайте пароль"
          theme="dark"
          type="password"
        />
        <div className="modal--form__link-wrapper"><button type="submit" onClick={() => openModal('reset-password-request')} className="modal--form__link">Восстановить пароль</button></div>
      </div>

      <div className="form--modal__actions form--modal__actions--column">
        <Button type="submit" className="red" disabled={hasManualEmailError || isSubmitting}>
          войти
        </Button>
        <Button className="outlined" onClick={() => openModal('register-user')}>
          зарегистрироваться
        </Button>
      </div>
    </form>
    </Modal>
  )
}

export default LoginModal
