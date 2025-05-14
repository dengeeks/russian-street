'use client'
import styles from './StreetGalleryDesktop.module.css'
import Image from 'next/image'
import SectionTitle from '@/shared/ui/SectionTitle'

type StreetGalleryDesktopProps = {
  images: string[]
}

const StreetGalleryDesktop = ({images}: StreetGalleryDesktopProps) => {
  return (
      <div className={`${styles.galleryDesktop} background`}>
        {images.slice(0, 4).map((img, i) => (
          <div className={`${styles[`item${i + 1}`]} ${styles.item}`} key={i}>
            <Image src={`/${img}`} fill className={styles.imageGallery} alt={`image ${i + 1}`} />
          </div>
        ))}

        <div className={styles.centerBlock}>
          <SectionTitle className={styles.titleGallery}>улица - ЭТО МЫ</SectionTitle>
        </div>

        {images.slice(4).map((img, i) => (
          <div className={`${styles[`item${i + 5}`]} ${styles.item}`} key={i + 4}>
            <Image src={`/${img}`} fill className={styles.imageGallery} alt={`image ${i + 8}`} />
          </div>
        ))}
      </div>
  )
}

export default StreetGalleryDesktop
