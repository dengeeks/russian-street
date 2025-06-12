'use client'
import styles from './StreetGalleryDesktop.module.css'
import Image from 'next/image'
import SectionTitle from '@/shared/ui/SectionTitle'
import { useHomeData } from '@/shared/context/home-data/useHomeDataContext'
import { getImageUrl } from '@/shared/utils/getImageUrl'
import { imageGallerySizes, gallerySizeByType } from '../../model/imageGallerySizes'

const StreetGalleryDesktop = () => {
  const { homeData: { street_images } } = useHomeData()

  const sortedImages = [...street_images].sort((a, b) => a.order - b.order)

  return (
    <div className={`${styles.galleryDesktop} background`}>
      {sortedImages.slice(0, 4).map((img) => (
        <div className={`${styles[`item${img.order}`]} ${styles.item}`} key={img.order}>
          <Image
            src={getImageUrl(img.image)}
            fill
            className={styles.imageGallery}
            alt={`Улица — изображение ${img.order}`}
            sizes={gallerySizeByType[imageGallerySizes[img.order]]}
          />

        </div>
      ))}

      <div className={`${styles.centerBlock} dashed-all`}>
        <SectionTitle className={styles.titleGallery}>улица - ЭТО МЫ</SectionTitle>
      </div>

      {sortedImages.slice(4).map((img) => (
        <div className={`${styles[`item${img.order}`]} ${styles.item}`} key={img.order}>
          <Image
            src={getImageUrl(img.image)}
            fill
            className={styles.imageGallery}
            alt={`Улица — изображение ${img.order}`}
            sizes={gallerySizeByType[imageGallerySizes[img.order]]}
          />
        </div>
      ))}
    </div>
  )
}

export default StreetGalleryDesktop
