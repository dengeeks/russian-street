import Button from '@/shared/ui/Button'
import FormField from '@/shared/ui/FormField'
import { SubmitHandler, useForm } from 'react-hook-form'
import useModal from '@/shared/store/modal'
import { EditAccountType } from '@/features/modal/edit-account-info-modal/model/type'
import { emailValidation, phoneValidation } from '@/shared/validation/validators'
import Modal from '@/shared/ui/Modal'

const EditAccountInfoModal = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EditAccountType>()

  const { closeModal } = useModal()

  const onSubmit: SubmitHandler<EditAccountType> = async data => {
    console.log(data)
  }

  return (
    <Modal onClose={closeModal}>
    <form onSubmit={handleSubmit(onSubmit)} className="form--modal">
      <h2 className="form--modal__title">Редактировать данные</h2>
      <div className="form--modal__body">
        <div className="form--modal__row">
          <FormField
            {...register('firstName')}
            error={errors.firstName?.message}
            label="Имя"
            name="firstName"
            placeholder="Иван"
            type="text"
            hint="Можно изменить в личном кабинете"
            theme="dark"
          />
          <FormField
            {...register('lastName')}
            error={errors.lastName?.message}
            label="Фамилия"
            name="lastName"
            type="text"
            placeholder="Иванов"
            hint="Можно изменить в личном кабинете"
            theme="dark"
          />
        </div>
        <div className="form--modal__row">
          <FormField
            {...register('patronymic')}
            error={errors.patronymic?.message}
            label="Отчество"
            name="patronymic"
            type="text"
            placeholder="Иванович"
            hint="Можно изменить в личном кабинете"
            theme="dark"
          />
          <FormField
            {...register('email', { ...emailValidation })}
            error={errors.email?.message}
            label="Email"
            name="email"
            placeholder="ivan@gmail.com"
            hint="Можно изменить в личном кабинете"
            theme="dark"
          />
        </div>
        <div className="form--modal__row">
          <FormField
            {...register('phone', { ...phoneValidation })}
            error={errors.phone?.message}
            label="Номер телефона"
            name="phone"
            placeholder="+7 923 567-89-90"
            hint="Можно изменить в личном кабинете"
            theme="dark"
          />
        </div>
      </div>
      <div className="form--modal__actions">
        <Button type="submit" className="red">
          Сохранить
        </Button>
        <Button
          type="reset"
          className="outlined"
          onClick={() => {
            reset()
            closeModal()
          }}>
          Отменить
        </Button>
      </div>
    </form>
    </Modal>
  )
}

export default EditAccountInfoModal
