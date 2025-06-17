import FormField from '@/shared/ui/FormField'
import CheckBox from '@/shared/ui/CheckBox'
import Link from 'next/link'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { JoinOrganizationType } from '../model/type'

type Props = {
  register: UseFormRegister<JoinOrganizationType>
  errors: FieldErrors<JoinOrganizationType>
}

export default function PassportInfoForm({ register, errors }: Props) {
  return (
    <>
      <div className="form--modal__section-header">
      <h2 className="form--modal__title">Паспортные данные*</h2>
      <p className="form--modal__description">Эта информация необходима для проверки службой безопасности</p>
      </div>
      <div className="form--modal__body">
        <div className="form--modal__row">
          <FormField
            {...register('passportSeries')}
            error={errors.passportSeries?.message}
            label="Серия паспорта"
            required
            name="passportSeries"
            placeholder="1234"
            theme="dark"
            hint="4 цифры серии паспорта"
          />
          <FormField
            {...register('passportNumber')}
            error={errors.passportNumber?.message}
            label="Номер паспорта"
            required
            name="passportNumber"
            placeholder="567890"
            theme="dark"
            hint="6 цифр номера паспорта"
          />
          <FormField
            {...register('passportIssueDate')}
            error={errors.passportIssueDate?.message}
            label="Дата выдачи"
            required
            name="passportIssueDate"
            placeholder="01.01.1991"
            theme="dark"
            hint="В формате дд.мм.гггг"
          />
        </div>
        <div style={{maxWidth: 560}}>
        <FormField
          {...register('passportIssuedBy')}
          error={errors.passportIssuedBy?.message}
          label="Кем выдан"
          required
          name="passportIssuedBy"
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
          <Link href="/" className="modal--form__link">
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
          <Link href="/" className="modal--form__link">
            на обработку персональных данных
          </Link>
        </CheckBox>
      </div>
    </>
  )
}
