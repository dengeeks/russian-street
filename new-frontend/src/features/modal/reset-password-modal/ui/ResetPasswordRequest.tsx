'use client'
import Button from '@/shared/ui/Button'
import FormField from '@/shared/ui/FormField'
import { SubmitHandler, useForm } from 'react-hook-form'
import { emailValidation } from '@/shared/validation/validators'
import useModal from '@/shared/store/modal'
import Modal from '@/shared/ui/Modal'
import { postResetPasswordRequest, ResetPasswordRequestType } from '@/shared/api/user/postResetPasswordRequest'
import { RegisterUserType } from '@/features/modal/register-modal/model/type'
import { useToast } from '@/shared/context/toast/useToastContext'
import { useState } from 'react'

const ResetPasswordRequest = () => {
  const [hasManualEmailError, setHasManualEmailError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<RegisterUserType>({
    mode: 'onChange',
  });

  const {closeModal} = useModal();
  const {showToast} = useToast()

  const onSubmit: SubmitHandler<ResetPasswordRequestType> = async data => {
    setHasManualEmailError(false);
    try {
      const response = await postResetPasswordRequest(data);
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
      closeModal()
      showToast(response.message, 'success');
    } catch {
      showToast('Произошла ошибка при восстановлении пароля.', 'error');
    }
  };

  return (
    <Modal onClose={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="form--modal">
        <h2 className="form--modal__title">Восстановление пароля</h2>
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
            hint="Пришлём код подтверждения"
            theme="dark"
          />
        </div>

        <div className="form--modal__actions form--modal__actions--column">
          <Button type="submit" className="red" disabled={hasManualEmailError || isSubmitting}>
            Сбросить пароль
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default ResetPasswordRequest
