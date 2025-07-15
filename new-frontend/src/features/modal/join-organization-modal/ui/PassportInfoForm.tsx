import FormField from '@/shared/ui/FormField'
import CheckBox from '@/shared/ui/CheckBox'
import Link from 'next/link'
import { UseFormRegister, FieldErrors, Controller, Control } from 'react-hook-form'
import type { JoinOrganizationType } from '@/shared/api/feedback/postFeedbackOrganization'
import {
  dateValidation,
  passportIssuerValidation, passportNumberValidation,
  passportSeriesValidation
} from '@/features/modal/join-organization-modal/model/validation'
import { ChangeEvent } from 'react'
import { formatDateInput } from '@/shared/utils/formatDate'

type Props = {
  register: UseFormRegister<JoinOrganizationType>;
  control: Control<JoinOrganizationType>;
  errors: FieldErrors<JoinOrganizationType>;
  setHasManualError: (value: boolean) => void;
}

export default function PassportInfoForm({ register, errors, setHasManualError, control}: Props) {
  return (
    <>
      <div className="form--modal__section-header">
      <h2 className="form--modal__title">Паспортные данные*</h2>
      <p className="form--modal__description">Эта информация необходима для проверки службой безопасности</p>
      </div>
      <div className="form--modal__body">
        <div className="form--modal__row">
          <FormField
            {...register('passport_series', {
              ...passportSeriesValidation,
              onChange: () => setHasManualError(false),
            })}
            error={errors.passport_series?.message}
            label="Серия паспорта"
            required
            name="passport_series"
            placeholder="1234"
            theme="dark"
            hint="4 цифры серии паспорта"
          />
          <FormField
            {...register('passport_number', {
              ...passportNumberValidation,
              onChange: () => setHasManualError(false),
            })}
            error={errors.passport_number?.message}
            label="Номер паспорта"
            required
            name="passport_number"
            placeholder="567890"
            theme="dark"
            hint="6 цифр номера паспорта"
          />
          <Controller
            name="passport_issue_date"
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
                error={errors.passport_issue_date?.message}
                label="Дата выдачи"
                required
                name="passport_issue_date"
                placeholder="31.12.1991"
                theme="dark"
                hint="В формате дд.мм.гггг"
                inputMode="numeric"
              />
            )}
          />
        </div>
        <div style={{maxWidth: 560}}>
        <FormField
          {...register('passport_issuer', {
            ...passportIssuerValidation,
            onChange: () => setHasManualError(false),
          })}
          error={errors.passport_issuer?.message}
          label="Кем выдан"
          required
          name="passport_issuer"
          placeholder="ОУФМС по Московской области в г. Москва"
          theme="dark"
          hint="Только кириллица"
        />
        </div>
        <CheckBox
          id="member-rights-agreement"
          {...register('memberRightsAgreement', {
            required: 'Необходимо согласие с правами и обязанностями'
          })}
          error={errors.memberRightsAgreement?.message}
          theme="dark">
          Я согласен с{' '}
          <Link href="/assets/legal/Устав_ОООУКС_Улицы_России_оригинал.pdf" target="_blank" rel="noopener noreferrer" className="legal-link">
            правами и обязанностями члена ООО УКС «Улицы России»
          </Link>
        </CheckBox>
        <CheckBox
          id="agreement-with-personal-info"
          {...register('agreement', {
            required: 'Необходимо согласие на обработку персональных данных'
          })}
          error={errors.agreement?.message}
          theme="dark">
          Я согласен (на){' '}
          <Link href="/assets/legal/Согласие_на_обработку_персональных_данных_Сайт_УР.pdf" target="_blank" rel="noopener noreferrer" className="legal-link">
            на обработку персональных данных
          </Link>
        </CheckBox>
      </div>
    </>
  )
}
