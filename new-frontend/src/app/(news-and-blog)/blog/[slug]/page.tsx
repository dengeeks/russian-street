import PostCardLarge from '@/widgets-page/news-and-blog/post-card-large'

import Breadcrumbs from '@/widgets/breadcrumbs'
import MediaSliderTabs from '@/widgets/media-slider-tabs'
import ContentShowcase from '@/widgets/сontent-showcase'
import PostDetails from '@/widgets-page/news-and-blog/post-details'


export default async function BlogDetailPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Блог', href: '/news' }, {label: 'Детали блога'}]} />
      <PostCardLarge title="Как прошёл мастер-класс по граффити с детьми 7–10лет" city="г.Кемерово" date="16.05.2024" views={124}/>
      <MediaSliderTabs/>
      <PostDetails/>
      <ContentShowcase title="другие новости"/>
    </>
  )
}
