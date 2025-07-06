'use client'

import dynamic from 'next/dynamic'
import Loader from '@/shared/ui/Loader'
const RegionalLeaderCard = dynamic(() => import('./ui/RegionalLeaderCard'), {
  ssr: false,
  loading: () => <Loader />,
})

export default RegionalLeaderCard