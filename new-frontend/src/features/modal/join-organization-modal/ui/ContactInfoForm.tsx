import type {ChangeEvent} from "react"
import FormField from '@/shared/ui/FormField'
import FormSelectField from '@/shared/ui/FormField/FormSelectField'
import { Controller, UseFormRegister, Control, FieldErrors, useWatch } from 'react-hook-form'
import type { JoinOrganizationType } from '@/shared/api/feedback/postFeedbackOrganization';
import {
  phoneValidation,
  emailValidation,
  last_nameValidation,
  first_nameValidation,
  middle_nameValidation
} from '@/shared/validation/validators'
import { useRegionList } from '@/shared/hooks/filter/useRegionList'
import { useCityList } from '@/shared/hooks/filter/useCityList'
import { dateValidation, socialValidation } from '@/features/modal/join-organization-modal/model/validation'
import { formatDateInput } from '@/shared/utils/formatDate'

interface ContactInfoFormProps {
  register: UseFormRegister<JoinOrganizationType>;
  control: Control<JoinOrganizationType>;
  errors: FieldErrors<JoinOrganizationType>;
  setHasManualError: (value: boolean) => void;
}

export default function ContactInfoForm({ register, control, errors, setHasManualError}: ContactInfoFormProps) {
  const region_id = useWatch({ control, name: 'region_id' })
  const { regions } = useRegionList()

  const {cities} = useCityList(region_id)

  return (
    <>
      <h2 className="form--modal__title">Контактные данные*</h2>
      <div className="form--modal__body">
        <div className="form--modal__row">
          <FormField
            {...register('last_name', { ...last_nameValidation, required: 'Фамилия обязательна для заполнения', onChange: () => setHasManualError(false), })}
            error={errors.last_name?.message}
            label="Фамилия"
            required
            name="last_name"
            placeholder="Иванов"
            theme="dark"
            hint="Только на кириллице"
          />
          <FormField
            {...register('first_name', { ...first_nameValidation, required: 'Имя обязательно для заполнения', onChange: () => setHasManualError(false), })}
            error={errors.first_name?.message}
            label="Имя"
            required
            name="first_name"
            placeholder="Иван"
            theme="dark"
            hint="Только на кириллице"
          />
          <FormField
            {...register('middle_name', { ...middle_nameValidation, required: 'Отчество обязательно для заполнения', onChange: () => setHasManualError(false), })}
            error={errors.middle_name?.message}
            label="Отчество"
            required
            name="middle_name"
            placeholder="Иванович"
            theme="dark"
            hint="Если нет отчества, оставьте поле пустым"
          />
          <Controller
            name="gender"
            control={control}
            rules={{ required: 'Укажите пол', onChange: () => setHasManualError(false), }}
            render={({ field }) => (
              <FormSelectField
                {...field}
                error={errors.gender?.message}
                label="Пол"
                required
                placeholder="M"
                name="gender"
                theme="dark"
                options={[
                  { id: 'Мужской', name: 'М' },
                  { id: 'Женский', name: 'Ж' }
                ]}
              />
            )}
          />
        </div>
        <div className="form--modal__row">
          <Controller
            name="date_of_birth"
            control={control}
            rules={{...dateValidation, onChange: () => setHasManualError(false),}}
            render={({ field }) => (
              <FormField
                {...field}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const formatted = formatDateInput(e.target.value)
                  field.onChange(formatted)
                }}
                value={field.value || ''}
                error={errors.date_of_birth?.message}
                label="Дата рождения"
                required
                name="date_of_birth"
                placeholder="31.12.1991"
                theme="dark"
                hint="В формате дд.мм.гггг"
                inputMode="numeric"
              />
            )}
          />

          <FormField
            {...register('phone', { ...phoneValidation, required: 'Телефон обязателен для заполнения', onChange: () => setHasManualError(false), })}
            error={errors.phone?.message}
            label="Номер телефона"
            required
            name="phone"
            placeholder="+7 923 567-89-90"
            theme="dark"
            hint="Только номера РФ"
          />
          <FormField
            {...register('email', { ...emailValidation, required: 'Почта обязательна для заполнения', onChange: () => setHasManualError(false),})}
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
            name="region_id"
            control={control}
            rules={{ required: 'Регион не выбран', onChange: () => setHasManualError(false), }}
            render={({ field }) => (
              <FormSelectField
                {...field}
                error={errors.region_id?.message}
                label="Регион"
                required
                name="region_id"
                placeholder="Калининградская область"
                theme="dark"
                hint="Выберите из списка"
                options={regions}
              />
            )}
          />
          <Controller
            name="city_id"
            control={control}
            rules={{ required: 'Город не выбран', onChange: () => setHasManualError(false) }}
            render={({ field }) => (
              <FormSelectField
                {...field}
                error={errors.city_id?.message}
                label="Город"
                required
                name="city_id"
                placeholder="Переяславль-Залесский"
                theme="dark"
                hint="Выберите из списка"
                options={cities}
              />
            )}
          />
          <FormField
            {...register('social', { ...socialValidation, onChange: () => setHasManualError(false)})}
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
