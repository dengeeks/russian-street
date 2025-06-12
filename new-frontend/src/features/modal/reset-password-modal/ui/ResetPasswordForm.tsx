'use client'
import Button from '@/shared/ui/Button'
import FormField from '@/shared/ui/FormField'
import {useForm } from 'react-hook-form'
import {ResetPasswordFormType} from "../model/type"
import Modal from '@/shared/ui/Modal'
import { passwordValidation } from '@/shared/validation/validators'
import { useResetPasswordForm } from '../model/useResetPasswordForm'
import { useBodyScrollLock } from '@/shared/hooks/useBodyScrollLock'

interface ResetPasswordFormProps {
  uid: string;
  token: string;
}

const ResetPasswordForm = ({uid, token}:ResetPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<ResetPasswordFormType>()

  useBodyScrollLock(true)

  const { onSubmit, close } = useResetPasswordForm({ uid, token });

  return (
    <Modal onClose={close}>
      <form onSubmit={handleSubmit(onSubmit)} className="form--modal">
        <h2 className="form--modal__title">Введите новый пароль</h2>
        <div className="form--modal__body">
          <FormField
            {...register('password', passwordValidation)}
            error={errors.password?.message}
            label="Введите пароль"
            required
            name="password"
            placeholder="Введите пароль"
            theme="dark"
            type="password"
          />
          <FormField
            {...register('confirmPassword', {required: 'Обязательное поле', validate: value => value === watch('password') || 'Пароли не совпадают'})}
            error={errors.confirmPassword?.message}
            label="Повторите пароль"
            required
            name="confirmPassword"
            placeholder="Введите пароль"
            theme="dark"
            type="password"
          />
        </div>

        <div className="form--modal__actions form--modal__actions--column">
          <Button type="submit" className="red">
            изменить пароль
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default ResetPasswordForm
