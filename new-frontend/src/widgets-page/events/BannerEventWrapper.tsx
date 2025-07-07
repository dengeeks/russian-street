'use client'

import BannerEvent from './banner'
import { useEventsData } from '@/shared/context/events/useEventsDataContext'
import type { EventAreaBannerType } from '@/shared/api/static/getEventAreaBanner'

const BannerEventWrapper = ({event}: EventAreaBannerType ) => {
  const { eventFilter } = useEventsData()

  // Фильтруем по типу (event/area) в зависимости от выбранного фильтра
  const bannerItem = event.find(item => item.type === eventFilter.type)

  if (!bannerItem) return null
  return (
      <BannerEvent title={bannerItem.title} format_type={bannerItem.format_type} image={bannerItem.image} video_url={bannerItem.video_url} />
  )
}

export default BannerEventWrapper
