import styles from './RegionPreview.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import Image from 'next/image'
import { RegionInfoType } from '@/shared/api/region/detail/type'
import { getImageUrl } from '@/shared/utils/getImageUrl'

const RegionPreview = ({info, image, name}: RegionInfoType) => {
  return (
    <section className={`container ${styles.regionPreview}`}>
      <SectionTitle>{name}</SectionTitle>
      <div className={styles.regionPreviewContent}>
        <div className={styles.regionPreviewImageWrapper}>
          <Image src={getImageUrl(image)} alt={name} fill priority sizes="
    (min-width: 1180px) 600px,
    (min-width: 1080px) 550px,
    (min-width: 1025px) 500px,
    (min-width: 1024px) 650px,
    (min-width: 690px) 650px,
    (max-width: 689px) calc(100vw - 32px)" />
        </div>
        <p className={styles.regionPreviewDescription}>
          {info}
        </p>
      </div>
    </section>
  )
}

export default RegionPreview
