'use client'
import styles from './JoinOrganizationPromo.module.css'
import ActionButton from '@/features/action-buttons'
import { useGlobalData } from '@/shared/context/global-data/useGlobalDataContext'

const JoinOrganizationPromo = () => {
  const { userData } = useGlobalData()

  if (userData?.status) {
    return null
  }

  return (
    <div className={styles.promoContainer}>
      <div className={styles.promoTitle}>Еще не участник?</div>
      <div className={styles.promoDescription}>
        Вступай в организацию «Улицы Росcии» и тебя ждут:
        <br />
        — Участие в федеральных и международных мероприятиях.
        <br />
        — Бесплатные мастер-классы от топовых деятелей.
        <br />
        — Обучающие программы экспертов «Улицы Росии».
        <br />
        — Помощь в обучении и трудоустройстве.
      </div>
        <ActionButton className={`${styles.promoButton} outlined white`} requireAuth modalName="join-organization">
          Вступить
        </ActionButton>

    </div>
  )
}

export default JoinOrganizationPromo
