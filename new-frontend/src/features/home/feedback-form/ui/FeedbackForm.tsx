import styles from './FeedbackForm.module.css'
import Button from '@/shared/ui/Button'
import CheckBox from '@/shared/ui/CheckBox'
import FormField from '@/shared/ui/FormField'
import { useForm } from 'react-hook-form'
import { FeedbackType } from '../model/type'
import { messageValidation, nameValidation } from '../model/validation'
import {emailValidation, phoneValidation} from "@/shared/validation/validators"
import { useFeedback } from '@/features/home/feedback-form/model/useFeedback'
import Link from 'next/link'

const FeedbackForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<FeedbackType>({
    mode: 'onChange',
  });

  const { onSubmit, hasManualError, setHasManualError } = useFeedback(setError, reset);

  return (
    <form className={styles.FeedbackForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.FeedbackFormBody}>
        <p className={styles.FeedbackFormDescription}>
          Оставьте заявку, мы свяжемся с вами в ближайшее время
        </p>
        <FormField
          {...register('name', { ...nameValidation, onChange: () => setHasManualError(false), })}
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
              required: 'Обязательное поле',
              ...phoneValidation,
              onChange: () => setHasManualError(false),
            })}
            required
            error={errors.phone?.message}
            label="ТЕЛЕФОН"
            name="phone"
            placeholder="Телефон"
            hint="Только номера РФ"
          />
          <FormField
            {...register('email_feed', {
              required: 'Обязательное поле',
              ...emailValidation,
              onChange: () => setHasManualError(false),
            })}
            error={errors.email_feed?.message}
            label="ПОЧТА"
            name="email_feed"
            placeholder="user@mail.ru"
            required
            hint="user@mail.ru"
          />
        </div>
        <FormField
          {...register('text', {
            ...messageValidation,
            onChange: () => setHasManualError(false),
          })}
          required
          error={errors.text?.message}
          label="СООБЩЕНИЕ"
          name="text"
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
          Я согласен <Link href="/assets/legal/Согласие_на_обработку_персональных_данных_Сайт_УР.pdf" target="_blank" rel="noopener noreferrer" className="legal-link">на обработку персональных данных</Link>
        </CheckBox>
      </div>

      <Button type="submit" className="red" disabled={hasManualError || isSubmitting}>ОТПРАВИТЬ</Button>
    </form>
  )
}

export default FeedbackForm
