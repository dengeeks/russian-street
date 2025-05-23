'use client'
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/shared/hooks/useIsMobile'
import { images } from '../model/mock/images'

const StreetGalleryDesktop = dynamic(() => import('./desktop/StreetGalleryDesktop'), {
  loading: () => (<></>),
});

const StreetGalleryMobile = dynamic(() => import('./mobile/StreetGalleryMobile'), {
  loading: () => (<></>),
});

const StreetGallery = () => {
  const isMobile = useIsMobile()
  return (
    <section className="section-spacing-top">
      {isMobile ? (
        <StreetGalleryMobile images={images} />
      ) : (
        <StreetGalleryDesktop images={images} />
      )}
    </section>
  )
}

export default StreetGallery
