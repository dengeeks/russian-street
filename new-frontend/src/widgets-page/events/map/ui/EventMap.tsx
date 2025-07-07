'use client'
import styles from "./EventMap.module.css"
import dynamic from 'next/dynamic'
import Loader from '@/shared/ui/Loader'
const MapIframe = dynamic(() => import('@/shared/ui/MapIframe'), { ssr: false, loading: () => <Loader/>, });

interface EventMapProps {
  title: string;
  yandex_address: string;
}

const EventMap = ({title, yandex_address}:EventMapProps) => {
  return (
    <section className={`container section-spacing-top ${styles.eventMapSection}`}>
      <MapIframe
        src={yandex_address}
        title={title}
      />

    </section>
  )
}

export default EventMap;