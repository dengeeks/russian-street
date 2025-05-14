'use client'
import styles from './StreetGallery.module.css'
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/shared/hooks/useIsMobile'

const StreetGalleryDesktop = dynamic(() => import('./desktop/StreetGalleryDesktop'), {
  loading: () => (<></>),
});

const StreetGalleryMobile = dynamic(() => import('./mobile/StreetGalleryMobile'), {
  loading: () => (<></>),
});

const images = [
  'gallery.png',
  'gallery.png',
  'gallery.png',
  'gallery.png',
  'gallery.png',
  'gallery.png',
  'gallery.png',
  'gallery.png',
  'gallery.png',
  'gallery.png',
  'gallery.png',
  'gallery.png',
  'gallery.png',
  'gallery.png',
  'gallery.png',
  'gallery.png',
  'gallery.png'
]

const StreetGallery = () => {
  const isMobile = useIsMobile()
  return (
    <section className={`${styles.gallery} background`}>
      {isMobile ? (
        <StreetGalleryMobile images={images} />
      ) : (
        <StreetGalleryDesktop images={images} />
      )}
    </section>
  )
}

export default StreetGallery
