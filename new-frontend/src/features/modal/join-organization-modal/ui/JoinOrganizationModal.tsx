'use client'
import styles from './JoinOrganizationModal.module.css'
import Button from '@/shared/ui/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { JoinOrganizationType } from '../model/type'
import Modal from '@/shared/ui/Modal'
import useModal from '@/shared/store/modal'
import ContactInfoForm from './ContactInfoForm'
import PassportInfoForm from './PassportInfoForm'
import { useMobileDetection } from '@/shared/hooks/useIsMobile'
import { useState } from 'react'
import Icon from '@/shared/icon'

const JoinOrganizationModal = () => {
  const [step, setStep] = useState<1 | 2>(1)
  const [isStepOneValid, setIsStepOneValid] = useState(false)
  const { closeModal } = useModal()
  const isMobile = useMobileDetection(940)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    trigger
  } = useForm<JoinOrganizationType>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<JoinOrganizationType> = async data => {
    console.log(data)
  }

  const handleNextStep = async () => {
    const valid = await trigger([
      'lastName',
      'firstName',
      'patronymic',
      'gender',
      'birthDate',
      'phone',
      'email',
      'city',
      'social'
    ])

    if (valid) {
      setIsStepOneValid(true)
      setStep(2)
    }
  }


  return (
    <Modal onClose={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="form--modal">
        {isMobile && (
          <div className={styles.formModalTabs}>
            <button
              type="button"
              className={`${styles.formModalTab} ${step === 1 ? styles.active : ''}`}
              onClick={() => setStep(1)}>
              Шаг 1
              {isStepOneValid && <Icon icon="step-check" width={13} height={12} />}
            </button>
            <button
              type="button"
              className={`${styles.formModalTab} ${step === 2 ? styles.active : ''}`}
              onClick={() => {
                if (isStepOneValid) {
                  setStep(2)
                }
              }}>
              Шаг 2
            </button>
          </div>
        )}
        <div className={`${styles.formModalStep} ${step === 1 ? styles.active : styles.hidden}`}>
          <ContactInfoForm register={register} control={control} errors={errors} />
        </div>

        <hr className={styles.formModalDivider} />

        <div className={`${styles.formModalStep} ${step === 2 ? styles.active : styles.hidden}`}>
          <PassportInfoForm register={register} errors={errors} />
        </div>

        <div className="form--modal__actions">
          {(isMobile && step === 1) && (
            <Button type="button" onClick={handleNextStep} className="red">
              Продолжить
            </Button>
          )}
          <Button
            type="submit"
            className="red"
            style={{
              display: !isMobile || step === 2 ? 'block' : 'none'
            }}
            disabled={isMobile && step !== 2}
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default JoinOrganizationModal
