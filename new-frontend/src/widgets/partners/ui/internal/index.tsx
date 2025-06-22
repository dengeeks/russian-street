'use client'
import { useMobileDetection } from '@/shared/hooks/useIsMobile'
import dynamic from 'next/dynamic'
import Loader from '@/shared/ui/Loader'
import type { PartnerListType } from '@/shared/api/partners/type'

const PartnersDesktop = dynamic(() => import('./desktop/PartnersDesktop'), {
  loading: () => (<Loader/>),
  ssr: false,
});

const PartnersMobile = dynamic(() => import('./mobile/PartnersMobile'), {
  loading: () => (<Loader/>),
  ssr: false,
});

interface PartnersResponsiveProps {
  data: PartnerListType;
}

export default function PartnersResponsive({data}: PartnersResponsiveProps) {
  const isMobile = useMobileDetection();
  return isMobile ? <PartnersMobile data={data}/> : <PartnersDesktop data={data} />;
}