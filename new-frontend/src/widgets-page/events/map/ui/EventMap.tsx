'use client'
import styles from "./EventMap.module.css"
import dynamic from 'next/dynamic'
import Loader from '@/shared/ui/Loader'
const MapIframe = dynamic(() => import('@/shared/ui/MapIframe'), { ssr: false, loading: () => <Loader/>, });


const EventMap = () => {
  return (
    <section className={`container section-spacing-top ${styles.eventMapSection}`}>
      <MapIframe
        src={''}
        title={''}
      />

    </section>
  )
}

export default EventMap;