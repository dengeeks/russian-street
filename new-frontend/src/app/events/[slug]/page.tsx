import BannerEvent from '@/widgets-page/events/banner'
import EventFullInfo from '@/widgets-page/events/full-info'

import MarqueeText from '@/widgets/marquee-text'
import ContentShowcase from '@/widgets/сontent-showcase'
import Breadcrumbs from '@/widgets/breadcrumbs'
import EventMap from '@/widgets-page/events/map'

export default async function EventDetailPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Мероприятия', href: '/events' }, {label: 'Соревнования по скейтбордингу'}]} />
      <BannerEvent/>
      <MarqueeText grayText="ул. Тухачевского 48Б кемерово "/>
      <EventFullInfo/>
      <EventMap/>
      <ContentShowcase title="Вам понравится"/>

    </>
  )
}
