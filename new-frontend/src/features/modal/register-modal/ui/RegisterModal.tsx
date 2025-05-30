import Button from '@/shared/ui/Button'
import FormField from '@/shared/ui/FormField'
import { SubmitHandler, useForm } from 'react-hook-form'
import {RegisterUserType} from "../model/type"
import { emailValidation, passwordValidation } from '@/shared/validation/validators'
import CheckBox from '@/shared/ui/CheckBox'
import useModal from '@/shared/store/modal'
import Link from 'next/link'
import Modal from '@/shared/ui/Modal'

const RegisterModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterUserType>()

  const {openModal, closeModal} = useModal();

  const onSubmit: SubmitHandler<RegisterUserType> = async data => {
    console.log(data)
  }

  return (
    <Modal onClose={closeModal}>
    <form onSubmit={handleSubmit(onSubmit)} className="form--modal">
      <h2 className="form--modal__title">Зарегистрироваться</h2>
      <div className="form--modal__body">
          <FormField
            {...register('firstName', {required: 'Обязательное поле'})}
            error={errors.firstName?.message}
            label="Имя"
            name="firstName"
            type="text"
            required
            placeholder="Ваше имя"
            hint="Можно изменить в личном кабинете"
            theme="dark"
          />
          <FormField
            {...register('email', { ...emailValidation })}
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
          id="member-rights-agreement"
          {...register('memberRightsAgreement', {
            required: 'Необходимо согласие с правами и обязанностями'
          })}
          error={errors.memberRightsAgreement?.message}
          theme="dark"
        >
          Я согласен с <Link href="/" className="modal--form__link">правами и обязанностями члена ООО УКС «Улицы России»</Link>
        </CheckBox>
        <CheckBox
          id="agreement-with-personal-info"
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
        <Button type="submit" className="red">
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
