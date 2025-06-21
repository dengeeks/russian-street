import Button from '@/shared/ui/Button'
import FormField from '@/shared/ui/FormField'
import { useForm } from 'react-hook-form'
import useModal from '@/shared/store/modal'

import {
  emailValidation,
  first_nameValidation, last_nameValidation,
  middle_nameValidation,
  phoneValidation
} from '@/shared/validation/validators'
import Modal from '@/shared/ui/Modal'
import { UserUpdateType } from '@/shared/api/user/patchUserUpdate'
import { useUpdateInfo } from '@/features/modal/edit-account-info-modal/model/useUpdateInfo'
import { useGlobalData } from '@/shared/context/global-data/useGlobalDataContext'

const EditAccountInfoModal = () => {
  const {userData} = useGlobalData()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<UserUpdateType>({
    mode: 'onChange',
    defaultValues: {
      first_name: userData?.first_name || '',
      last_name: userData?.last_name || '',
      middle_name: userData?.middle_name || '',
      email: userData?.email || '',
      phone_number: userData?.phone_number || '',
    },
  });

  const { closeModal } = useModal()

  const { onSubmit, hasManualError, setHasManualError } = useUpdateInfo(setError);

  return (
    <Modal onClose={closeModal}>
    <form onSubmit={handleSubmit(onSubmit)} className="form--modal">
      <h2 className="form--modal__title">Редактировать данные</h2>
      <div className="form--modal__body">
        <div className="form--modal__row">
          <FormField
            {...register('first_name', {...first_nameValidation, onChange: () => setHasManualError(false)})}
            error={errors.first_name?.message}
            label="Имя"
            name="first_name"
            placeholder="Иван"
            type="text"
            hint="Можно изменить в личном кабинете"
            theme="dark"
          />
          <FormField
            {...register('last_name', {...last_nameValidation, onChange: () => setHasManualError(false)})}
            error={errors.last_name?.message}
            label="Фамилия"
            name="last_name"
            type="text"
            placeholder="Иванов"
            hint="Можно изменить в личном кабинете"
            theme="dark"
          />
        </div>
        <div className="form--modal__row">
          <FormField
            {...register('middle_name', {...middle_nameValidation, onChange: () => setHasManualError(false)})}
            error={errors.middle_name?.message}
            label="Отчество"
            name="middle_name"
            type="text"
            placeholder="Иванович"
            hint="Можно изменить в личном кабинете"
            theme="dark"
          />
          <FormField
            {...register('email', { ...emailValidation, onChange: () => setHasManualError(false), } )}
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
            {...register('phone_number', { ...phoneValidation, onChange: () => setHasManualError(false) })}
            error={errors.phone_number?.message}
            label="Номер телефона"
            name="phone_number"
            placeholder="+7 923 567-89-90"
            hint="Можно изменить в личном кабинете"
            theme="dark"
          />
        </div>
      </div>
      <div className="form--modal__actions">
        <Button type="submit" className="red" disabled={hasManualError || isSubmitting}>
          Сохранить
        </Button>
        <Button
          type="reset"
          className="outlined"
          onClick={() => {
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
