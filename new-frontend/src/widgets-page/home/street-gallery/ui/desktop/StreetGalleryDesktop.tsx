'use client'
import styles from './StreetGalleryDesktop.module.css'
import Image from 'next/image'
import SectionTitle from '@/shared/ui/SectionTitle'
import { useHomeData } from '@/shared/context/home-data/useHomeDataContext'
import { getImageUrl } from '@/shared/utils/getImageUrl'

const StreetGalleryDesktop = () => {
  const { homeData: { street_images } } = useHomeData()

  const sortedImages = [...street_images].sort((a, b) => a.order - b.order)

  const fullImages = [
    ...sortedImages,
    ...Array.from({ length: Math.max(0, 17 - sortedImages.length) }, (_, i) => ({
      image: undefined,
      order: sortedImages.length + i,
      isDefault: true,
    })),
  ]

  return (
    <div className={`${styles.galleryDesktop} background`}>
      {fullImages.slice(0, 4).map((img, i) => (
        <div className={`${styles[`item${i + 1}`]} ${styles.item}`} key={`top-${i}`}>
          <Image
            src={getImageUrl(img.image)}
            fill
            className={styles.imageGallery}
            alt={`Улица — изображение ${i + 1}`}
          />
        </div>
      ))}

      <div className={`${styles.centerBlock} dashed-all`}>
        <SectionTitle className={styles.titleGallery}>улица - ЭТО МЫ</SectionTitle>
      </div>

      {fullImages.slice(4).map((img, i) => (
        <div className={`${styles[`item${i + 5}`]} ${styles.item}`} key={`bottom-${i}`}>
          <Image
            src={getImageUrl(img.image)}
            fill
            className={styles.imageGallery}
            alt={`Улица — изображение ${i + 5}`}
          />
        </div>
      ))}
    </div>
  )
}

export default StreetGalleryDesktop
