import styles from './DirectionItem.module.css'
import DirectionSubcategories from './DirectionSubcategories'
import SectionTitle from '@/shared/ui/SectionTitle'
import Link from 'next/link'
import Image from 'next/image'
import type { DisciplinesType } from '@/shared/api/direction/disciplines/type'
import { getImageUrl } from '@/shared/utils/getImageUrl'

const DirectionItem = ({name, second_image, first_description, sub_disciplines}: DisciplinesType) => {
  return (
    <div className={styles.directionItem}>
      <div className={styles.directionItem__content}>
        <div className={styles.directionItem__textBlock}>
          <SectionTitle>{name}</SectionTitle>
          <p className={`${styles.directionItem__description} ${styles.directionItem__hiddenDesktop}`}>
            {first_description}
          </p>
        </div>
        <div className={styles.directionItem__imageAndSubcategories}>
          <div className={styles.directionItem__imageWrapper}>
            <Image src={getImageUrl(second_image)} fill alt={name} sizes="
    (min-width: 1240px) 590px,
    (min-width: 1140px) 550px,
    (min-width: 1080px) 520px,
    (min-width: 1024px) 500px,
    (min-width: 900px) 450px,
    (min-width: 820px) 400px,
    (min-width: 768px) 370px,
    calc(100vw - 32px)" />
          </div>
          <div className={styles.directionItem__subcategories}>
            <DirectionSubcategories data={sub_disciplines} />
          </div>
        </div>
      </div>
      <p className={`${styles.directionItem__description} ${styles.directionItem__hiddenMobile}`}>
        {first_description}
      </p>
      <Link href="/" className="more-link">
        Мероприятия
      </Link>
    </div>
  )
}

export default DirectionItem
