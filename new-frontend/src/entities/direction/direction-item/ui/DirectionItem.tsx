
import styles from './DirectionItem.module.css'
import DirectionSubcategories from './DirectionSubcategories'
import SectionTitle from '@/shared/ui/SectionTitle'
import Link from 'next/link'
import Image from 'next/image'
import { DirectionType } from '../model/type'


const DirectionItem = ({title, img, description, sub_category}: DirectionType) => {
  return (
    <div className={styles.directionItem}>
      <div className={styles.directionItem__content}>
        <div className={styles.directionItem__textBlock}>
          <SectionTitle>{title}</SectionTitle>
          <p className={`${styles.directionItem__description} ${styles.directionItem__hiddenDesktop}`}>
            {description}
          </p>
        </div>
        <div className={styles.directionItem__imageAndSubcategories}>
          <div className={styles.directionItem__imageWrapper}>
            <Image src={img} fill alt={title} />
          </div>
          <div className={styles.directionItem__subcategories}>
            <DirectionSubcategories data={sub_category} />
          </div>
        </div>
      </div>
      <p className={`${styles.directionItem__description} ${styles.directionItem__hiddenMobile}`}>
        {description}
      </p>
      <Link href="/" className="more-link">
        Мероприятия
      </Link>
    </div>
  )
}

export default DirectionItem
