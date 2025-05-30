import FormField from '@/shared/ui/FormField'
import FormSelectField from '@/shared/ui/FormField/FormSelectField'
import { Controller, UseFormRegister, Control, FieldErrors } from 'react-hook-form'
import { JoinOrganizationType } from '../model/type'
import { phoneValidation, emailValidation } from '@/shared/validation/validators'

interface ContactInfoFormProps {
  register: UseFormRegister<JoinOrganizationType>
  control: Control<JoinOrganizationType>
  errors: FieldErrors<JoinOrganizationType>
}

export default function ContactInfoForm({ register, control, errors }: ContactInfoFormProps) {
  return (
    <>
      <h2 className="form--modal__title">Контактные данные*</h2>
      <div className="form--modal__body">
        <div className="form--modal__row">
          <FormField
            {...register('lastName', {required: 'поле обязательно'})}
            error={errors.lastName?.message}
            label="Фамилия"
            required
            name="lastName"
            placeholder="Иванов"
            theme="dark"
            hint="Только на кириллице"
          />
          <FormField
            {...register('firstName')}
            error={errors.firstName?.message}
            label="Имя"
            required
            name="firstName"
            placeholder="Иван"
            theme="dark"
            hint="Только на кириллице"
          />
          <FormField
            {...register('patronymic')}
            error={errors.patronymic?.message}
            label="Отчество"
            required
            name="patronymic"
            placeholder="Иванович"
            theme="dark"
            hint="Если нет отчества, оставьте поле пустым"
          />
          <Controller
            name="gender"
            control={control}
            rules={{ required: 'Укажите пол' }}
            render={({ field }) => (
              <FormSelectField
                {...field}
                error={errors.gender?.message}
                label="Пол"
                required
                placeholder="M"
                name="gender"
                theme="dark"
                options={['М', 'Ж']}
              />
            )}
          />
        </div>
        <div className="form--modal__row">
          <FormField
            {...register('birthDate')}
            error={errors.birthDate?.message}
            label="Дата рождения"
            required
            name="birthDate"
            placeholder="31.12.1991"
            theme="dark"
            hint="В формате дд.мм.гггг"
          />
          <FormField
            {...register('phone', { ...phoneValidation })}
            error={errors.phone?.message}
            label="Номер телефона"
            required
            name="phone"
            placeholder="+7 923 567-89-90"
            theme="dark"
            hint="Только номера РФ"
          />
          <FormField
            {...register('email', { ...emailValidation })}
            error={errors.email?.message}
            label="Почта"
            required
            name="email"
            placeholder="ivan@gmail.com"
            theme="dark"
            hint="Пришлём код подтверждения"
          />
        </div>
        <div className="form--modal__row">
          <Controller
            name="city"
            control={control}
            rules={{ required: 'Город не выбран' }}
            render={({ field }) => (
              <FormSelectField
                {...field}
                error={errors.city?.message}
                label="Город"
                required
                name="city"
                placeholder="Москва"
                theme="dark"
                hint="Выберите из списка"
                options={['Алматы', 'Москва']}
              />
            )}
          />
          <FormField
            {...register('social')}
            error={errors.social?.message}
            label="Социальная сеть для связи"
            required
            name="social"
            placeholder="@user"
            theme="dark"
          />
        </div>
      </div>
    </>
  )
}
