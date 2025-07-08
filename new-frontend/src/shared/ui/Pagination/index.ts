'use client'

import dynamic from 'next/dynamic'
const Pagination = dynamic(() => import('./ui/Pagination'), {
  ssr: false,
})

export default Pagination