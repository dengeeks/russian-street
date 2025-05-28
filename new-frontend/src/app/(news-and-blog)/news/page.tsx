import PostCardLarge from '@/widgets-page/news-and-blog/post-card-large'
import PostList from '@/widgets-page/news-and-blog/post-list'

import Breadcrumbs from '@/widgets/breadcrumbs'


export default async function NewsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Новости' }]} />
      <PostCardLarge title="Как прошёл мастер-класс по граффити с детьми 7–10лет" city="г.Кемерово" date="16.05.2024" media="/test/events.png"/>
      <PostList/>
    </>
  )
}
