import styles from './EveryoneWillLikeUs.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import Button from '@/shared/ui/Button'
import { getEveryoneLikes } from '@/shared/api/static/getEveryoneLikes'
import LikeUsContent from './internal/LikeUsContent'


const EveryoneWillLikeUs = async () => {
  const EveryoneLikes = await getEveryoneLikes()

  if (EveryoneLikes.everyone_likes.length === 0) {
    return null
  }

  return (
    <section className={`container section-spacing-top ${styles.everyoneWillLike}`}>
      <SectionTitle>У нас понравится всем</SectionTitle>

      <LikeUsContent data={EveryoneLikes}/>
      <div className={styles.everyoneButton}>
        <Button className="red" type="button">
          ВСТУПИТЬ
        </Button>
      </div>
    </section>
  )
}

export default EveryoneWillLikeUs
