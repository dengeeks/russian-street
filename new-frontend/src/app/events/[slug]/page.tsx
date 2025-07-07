import BannerEvent from '@/widgets-page/events/banner'
import EventFullInfo from '@/widgets-page/events/full-info'

import MarqueeText from '@/widgets/marquee-text'
import ContentShowcase from '@/widgets/сontent-showcase'
import Breadcrumbs from '@/widgets/breadcrumbs'
import EventMap from '@/widgets-page/events/map'
import { getEventOrAreaDetail } from '@/shared/api/event-or-area/detail/getEventOrAreaDetail'
import { notFound } from 'next/navigation'
import { EventOrAreaType } from '@/shared/api/type'

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{type: EventOrAreaType}>
}

export default async function EventDetailPage(props: EventDetailPageProps) {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams]);
  const { slug } = params;
  const { type } = searchParams;
  const eventDetail = await getEventOrAreaDetail(slug, type)
  if (eventDetail === 404) return notFound()

  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Мероприятия', href: '/events' }, {label: eventDetail.title}]} />
      <BannerEvent id={eventDetail.id} title={eventDetail.title} image={eventDetail.image} format_type={eventDetail.format_type} video_url={eventDetail.video_url} city={eventDetail.city} type={type} is_favorite={eventDetail.is_favorite}/>
      <MarqueeText grayText="ул. Тухачевского 48Б кемерово "/>
      <EventFullInfo description={eventDetail.description} region_id={eventDetail.region}/>
      <EventMap title={eventDetail.title} yandex_address={eventDetail.yandex_address}/>
      <ContentShowcase title="Вам понравится" type={type} subdiscipline_ids={eventDetail.sub_discipline.id}/>

    </>
  )
}
