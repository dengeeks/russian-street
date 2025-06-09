'use client'
import Button from '@/shared/ui/Button'
import FormField from '@/shared/ui/FormField'
import { useForm } from 'react-hook-form'
import { emailValidation } from '@/shared/validation/validators'
import useModal from '@/shared/store/modal'
import Modal from '@/shared/ui/Modal'
import { ResetPasswordRequestType } from '@/shared/api/user/postResetPasswordRequest'
import { useResetPasswordRequest } from '@/features/modal/reset-password-modal/model/useResetPasswordRequest'


const ResetPasswordRequest = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<ResetPasswordRequestType>({
    mode: 'onChange',
  });

  const {closeModal} = useModal();

  const { onSubmit, hasManualEmailError, setHasManualEmailError } = useResetPasswordRequest(setError);


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
