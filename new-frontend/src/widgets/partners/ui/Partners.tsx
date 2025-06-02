'use client'
import './Partners.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import { useMobileDetection } from '@/shared/hooks/useIsMobile'
import dynamic from 'next/dynamic'
import Loading from '@/app/loading'

const PartnersDesktop = dynamic(() => import('./desktop/PartnersDesktop'), {
  loading: () => (<Loading/>),
});

const PartnersMobile = dynamic(() => import('./mobile/PartnersMobile'), {
  loading: () => (<Loading/>),
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
