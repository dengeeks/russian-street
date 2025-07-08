'use client'
import dynamic from 'next/dynamic'
import Loader from '@/shared/ui/Loader'
const FeedbackContact = dynamic(() => import('./ui/FeedbackContact'), {
  ssr: false,
  loading: () => <Loader />,
})

export default FeedbackContact