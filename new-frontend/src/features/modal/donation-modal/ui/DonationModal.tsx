'use client'
import Button from '@/shared/ui/Button'
import FormField from '@/shared/ui/FormField'
import { SubmitHandler, useForm } from 'react-hook-form'
import { DonationType } from '../model/type'
import { emailValidation, phoneValidation } from '@/shared/validation/validators'
import { useState } from 'react'
import Modal from '@/shared/ui/Modal'
import useModal from '@/shared/store/modal'

const DonationModal = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom' | null>(null)
  const { closeModal } = useModal()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors
  } = useForm<DonationType>()

  const onSelectAmount = (amount: number | 'custom') => {
    setSelectedAmount(amount)
    if (amount !== 'custom') {
      setValue('price', amount, { shouldValidate: true })
      clearErrors('price')
    } else {
      setValue('price', 0)
    }
  }

  const onSubmit: SubmitHandler<DonationType> = async data => {
    if (!data.price || data.price < 1) {
      setError('price', { type: 'manual', message: 'Выберите или введите сумму' })
      return
    }
    console.log(data)
  }

  return (
    <Modal onClose={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="form--modal">
        <div className="form--modal__row--donate">
          {[250, 500, 1000].map(amount => (
            <Button
              key={amount}
              type="button"
              className={selectedAmount === amount ? 'red' : 'gray'}
              onClick={() => onSelectAmount(amount)}>
              {amount}₽
            </Button>
          ))}
          <Button
            type="button"
            className={selectedAmount === 'custom' ? 'red' : 'blue'}
            onClick={() => onSelectAmount('custom')}>
            Другая сумма
          </Button>
        </div>
        {errors.price && <span className="form--modal__error">{errors.price.message}</span>}
        <div className="form--modal__body">
          {selectedAmount === 'custom' && (
            <FormField
              {...register('price', {
                required: 'Введите сумму',
                valueAsNumber: true
              })}
              error={errors.price?.message}
              name="price"
              min={1}
              placeholder="Введите сумму"
              theme="dark"
              type="number"
            />
          )}

          <FormField
            {...register('firstName')}
            error={errors.firstName?.message}
            name="firstName"
            placeholder="Ваше имя"
            theme="grey"
            type="text"
          />
          <FormField
            {...register('phone', { ...phoneValidation })}
            error={errors.phone?.message}
            name="phone"
            placeholder="Номер телефона"
            theme="grey"
          />
          <FormField
            {...register('email', { ...emailValidation })}
            error={errors.email?.message}
            name="email"
            placeholder="Почта"
            theme="grey"
          />
        </div>

        <div className="form--modal__actions form--modal__actions--column">
          <Button type="submit" className="red">
            пожертвовать
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default DonationModal
