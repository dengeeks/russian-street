'use client'
import dynamic from 'next/dynamic'
import Loader from '@/shared/ui/Loader'
const DonationHistory = dynamic(() => import('./ui/DonationHistory'), {
  ssr: false,
  loading: () => <Loader />,
})

export default DonationHistory