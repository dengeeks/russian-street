'use client'
import './Partners.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import { useIsMobile } from '@/shared/hooks/useIsMobile'
import dynamic from 'next/dynamic'

const PartnersDesktop = dynamic(() => import('./desktop/PartnersDesktop'), {
  loading: () => (<></>),
});

const PartnersMobile = dynamic(() => import('./mobile/PartnersMobile'), {
  loading: () => (<></>),
});


const Partners = () => {
  const isMobile = useIsMobile()
  return (
    <section className="container partners-section">
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
