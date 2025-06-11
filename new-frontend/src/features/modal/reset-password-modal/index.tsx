'use client'
import dynamic from 'next/dynamic'
import Loader from '@/shared/ui/Loader'

const ResetPasswordForm = dynamic(() => import('./ui/ResetPasswordForm'), {
  loading: () => <Loader/>,
  ssr: false,
})

export default ResetPasswordForm