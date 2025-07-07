import PostCardLarge from '@/widgets-page/news-and-blog/post-card-large'

import Breadcrumbs from '@/widgets/breadcrumbs'
import MediaSliderTabs from '@/widgets/media-slider-tabs'
import ContentShowcase from '@/widgets/сontent-showcase'
import PostDetails from '@/widgets-page/news-and-blog/post-details'
import { getBlogDetail } from '@/shared/api/blog-new/detail/getBlogDetail'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Loader from '@/shared/ui/Loader'

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({params}: BlogDetailPageProps) {
  const {slug} = await params;

  const blogDetail = await getBlogDetail(slug);

  if (blogDetail === 404) {
    notFound()
  }


  return (
    <>
      <Breadcrumbs
        items={[{ label: 'Главная', href: '/' }, { label: 'Блог', href: '/blog' }, { label: blogDetail.title }]}
      />
      <PostCardLarge title={blogDetail.title} city={blogDetail.city} date={blogDetail.created_at} views={blogDetail.count_views} />
      <MediaSliderTabs gallery_items={blogDetail.gallery_items}/>
      <PostDetails description={blogDetail.description} created_at={blogDetail.created_at}/>
      <Suspense fallback={<Loader />}>
        <ContentShowcase title="другие новости" subdiscipline_ids={blogDetail.subdiscipline.id} />
      </Suspense>
    </>
  )
}
