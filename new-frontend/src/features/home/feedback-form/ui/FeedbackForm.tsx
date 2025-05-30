import styles from './FeedbackForm.module.css'
import Button from '@/shared/ui/Button'
import CheckBox from '@/shared/ui/CheckBox'
import FormField from '@/shared/ui/FormField'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FeedbackType } from '../model/type'
import {messageValidation } from '../model/validation'
import {emailValidation, phoneValidation} from "@/shared/validation/validators"

const FeedbackForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FeedbackType>()

  const onSubmit: SubmitHandler<FeedbackType> = async data => {
    console.log(data)
  }

  return (
    <form className={styles.FeedbackForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.FeedbackFormBody}>
        <p className={styles.FeedbackFormDescription}>
          Оставьте заявку, мы свяжемся с вами в ближайшее время
        </p>
        <FormField
          {...register('name', { required: 'Обязательное поле' })}
          error={errors.name?.message}
          label="ИМЯ"
          name="name"
          placeholder="Имя"
          required
          hint="Только кириллица"
        />
        <div className={styles.FeedbackFormBodyRow}>
          <FormField
            {...register('phone', {
              ...phoneValidation
            })}
            error={errors.phone?.message}
            label="ТЕЛЕФОН"
            name="phone"
            placeholder="Телефон"
            hint="Только номера РФ"
          />
          <FormField
            {...register('email', {
              required: 'Обязательное поле',
              ...emailValidation
            })}
            error={errors.email?.message}
            label="ПОЧТА"
            name="email"
            placeholder="user@mail.ru"
            required
            hint="Пришлём код подтверждения"
          />
        </div>
        <FormField
          {...register('message', {
            ...messageValidation
          })}
          error={errors.message?.message}
          label="СООБЩЕНИЕ"
          name="message"
          placeholder="Напишите сообщение"
          textarea
          hint="Не более 500 символов"
        />
        <CheckBox
          id="agreement-with-personal-info"
          {...register('agreement', {
            required: 'Необходимо согласие на обработку персональных данных'
          })}
          error={errors.agreement?.message}
        >
          Я согласен на обработку персональных данных
        </CheckBox>
      </div>
      <Button type="submit">ОТПРАВИТЬ</Button>
    </form>
  )
}

export default FeedbackForm
