import Button from '@/shared/ui/Button'
import FormField from '@/shared/ui/FormField'
import { SubmitHandler, useForm } from 'react-hook-form'
import { emailValidation, passwordValidation } from '@/shared/validation/validators'
import useModal from '@/shared/store/modal'
import Modal from '@/shared/ui/Modal'
import { LoginType, postLogin } from '@/shared/api/user/postLogin'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/shared/context/toast/useToastContext'
import { RegisterUserType } from '@/features/modal/register-modal/model/type'

const LoginModal = () => {
  const [hasManualEmailError, setHasManualEmailError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<RegisterUserType>({
    mode: 'onChange',
  });

  const router = useRouter()
  const {showToast} = useToast()
  const {openModal, closeModal} = useModal();

  const onSubmit: SubmitHandler<LoginType> = async data => {
    setHasManualEmailError(false);
    try {
      const response = await postLogin(data);
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
      // Если авторизация прошла успешно, перенаправляем пользователя
      router.push("/profile");
      closeModal()
      showToast('Вы успешно вошли в систему!', 'success');
    } catch (error: unknown) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Произошла ошибка при авторизации.';

      setError('email', { type: 'manual', message });
      setError('password', { type: 'manual', message });
      setHasManualEmailError(true);
      showToast(message, 'invalid');
    }

  };

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
