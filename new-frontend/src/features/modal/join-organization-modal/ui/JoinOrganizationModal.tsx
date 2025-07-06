'use client'
import styles from './JoinOrganizationModal.module.css'
import Button from '@/shared/ui/Button'
import { useForm } from 'react-hook-form'
import type { JoinOrganizationType } from '@/shared/api/feedback/postFeedbackOrganization';
import Modal from '@/shared/ui/Modal'
import useModal from '@/shared/store/modal'
import ContactInfoForm from './ContactInfoForm'
import PassportInfoForm from './PassportInfoForm'
import { useMobileDetection } from '@/shared/hooks/useIsMobile'
import { useState } from 'react'
import Icon from '@/shared/icon'
import { useOrganization } from '@/features/modal/join-organization-modal/model/useOrganization'

const JoinOrganizationModal = () => {
  const [step, setStep] = useState<1 | 2>(1)
  const [isStepOneValid, setIsStepOneValid] = useState(false)
  const { closeModal } = useModal()
  const isMobile = useMobileDetection(940)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    trigger,
    setError,
  } = useForm<JoinOrganizationType>({
    mode: 'onChange'
  })

  const {onSubmit, hasManualError, setHasManualError} = useOrganization(setError)

  const handleNextStep = async () => {
    const valid = await trigger([
      'last_name',
      'first_name',
      'middle_name',
      'gender',
      'date_of_birth',
      'phone',
      'email',
      'region_id',
      'city_id',
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
          <ContactInfoForm register={register} control={control} errors={errors} setHasManualError={setHasManualError}/>
        </div>

        <hr className={styles.formModalDivider} />

        <div className={`${styles.formModalStep} ${step === 2 ? styles.active : styles.hidden}`}>
          <PassportInfoForm register={register} errors={errors} setHasManualError={setHasManualError} control={control}/>
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
            disabled={isMobile && step !== 2 || hasManualError || isSubmitting}
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default JoinOrganizationModal
