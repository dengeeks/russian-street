import Button from '@/shared/ui/Button'
import FormField from '@/shared/ui/FormField'
import { SubmitHandler, useForm } from 'react-hook-form'
import {ResetPasswordRequestType} from "../model/type"
import { emailValidation } from '@/shared/validation/validators'
import useModal from '@/shared/store/modal'
import Modal from '@/shared/ui/Modal'

const ResetPasswordRequest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordRequestType>()

  const {closeModal} = useModal();

  const onSubmit: SubmitHandler<ResetPasswordRequestType> = async data => {
    console.log(data)
  }

  return (
    <Modal onClose={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="form--modal">
        <h2 className="form--modal__title">Восстановление пароля</h2>
        <div className="form--modal__body">
          <FormField
            {...register('email', {required: 'Обязательное поле', ...emailValidation })}
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
          <Button type="submit" className="red">
            Сбросить пароль
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default ResetPasswordRequest
