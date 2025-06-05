'use client'
import dynamic from 'next/dynamic';
import { useMobileDetection } from '@/shared/hooks/useIsMobile'
import { images } from '../model/mock/images'
import Loader from '@/shared/ui/Loader'

const StreetGalleryDesktop = dynamic(() => import('./desktop/StreetGalleryDesktop'), {
  loading: () => (<Loader/>),
});

const StreetGalleryMobile = dynamic(() => import('./mobile/StreetGalleryMobile'), {
  loading: () => (<Loader/>),
});

const StreetGallery = () => {
  const isMobile = useMobileDetection()
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
