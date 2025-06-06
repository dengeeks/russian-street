'use client'
import './Partners.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import { useMobileDetection } from '@/shared/hooks/useIsMobile'
import dynamic from 'next/dynamic'
import Loader from '@/shared/ui/Loader'

const PartnersDesktop = dynamic(() => import('./desktop/PartnersDesktop'), {
  loading: () => (<Loader/>),
});

const PartnersMobile = dynamic(() => import('./mobile/PartnersMobile'), {
  loading: () => (<Loader/>),
});


const Partners = () => {
  const isMobile = useMobileDetection()
  return (
    <section className="container partners-section section-spacing-top">
      <SectionTitle>ПАРТНЁРЫ</SectionTitle>
      {isMobile ? (
        <PartnersMobile />
      ) : (
        <PartnersDesktop />
      )}
    </section>
  )
}

export default Partners
