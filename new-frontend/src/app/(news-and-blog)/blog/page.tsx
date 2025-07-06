import PostList from '@/widgets-page/news-and-blog/post-list'

import Breadcrumbs from '@/widgets/breadcrumbs'
import PostFilter from '@/widgets-page/news-and-blog/post-filter'
import { BlogDataProvider } from '@/shared/context/blog/BlogDataContext'

export default async function BlogPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Блог' }]} />
      <BlogDataProvider>
        <PostFilter />
        <PostList />
      </BlogDataProvider>
    </>
  )
}
