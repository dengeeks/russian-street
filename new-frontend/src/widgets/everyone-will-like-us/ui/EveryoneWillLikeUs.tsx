import styles from './EveryoneWillLikeUs.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import { getEveryoneLikes } from '@/shared/api/static/getEveryoneLikes'
import LikeUsContent from './internal/LikeUsContent'
import ActionButton from '@/features/action-buttons'


const EveryoneWillLikeUs = async () => {
  const EveryoneLikes = await getEveryoneLikes()

  if (EveryoneLikes.everyone_likes.length === 0) {
    return null
  }

  return (
    <section className={`container section-spacing-top section-spacing-bottom ${styles.everyoneWillLike}`}>
      <SectionTitle>У нас понравится всем</SectionTitle>

      <LikeUsContent data={EveryoneLikes}/>
      <div className={styles.everyoneButton}>
        <ActionButton className="red" type="button" modalName="join-organization" requireAuth>
          ВСТУПИТЬ
        </ActionButton>
      </div>
    </section>
  )
}

export default EveryoneWillLikeUs
