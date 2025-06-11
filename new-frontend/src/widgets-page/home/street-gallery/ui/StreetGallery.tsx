'use client'
import dynamic from 'next/dynamic';
import { useMobileDetection } from '@/shared/hooks/useIsMobile'
import Loader from '@/shared/ui/Loader'

const StreetGalleryDesktop = dynamic(() => import('./desktop/StreetGalleryDesktop'), {
  loading: () => (<Loader/>),
  ssr: false
});

const StreetGalleryMobile = dynamic(() => import('./mobile/StreetGalleryMobile'), {
  loading: () => (<Loader/>),
  ssr: false
});

const StreetGallery = () => {
  const isMobile = useMobileDetection()
  return (
    <section className="section-spacing-top">
      {isMobile ? (
        <StreetGalleryMobile />
      ) : (
        <StreetGalleryDesktop />
      )}
    </section>
  )
}

export default StreetGallery
