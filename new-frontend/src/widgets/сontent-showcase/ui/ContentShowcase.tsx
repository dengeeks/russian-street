import './ContentShowcase.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import Link from 'next/link'
import ContentShowcaseSwiper from './internal/ContentShowcaseSwiper'
import { getBlogList } from '@/shared/api/blog-new/list/getBlogList'
import { getEventOrAreaList } from '@/shared/api/event-or-area/list/getEventOrAreaList'
import { EventOrAreaType } from '@/shared/api/type'

interface ContentShowcaseProps {
  title: string;
  type?: EventOrAreaType;
  subdiscipline_ids?: string;
}

const ContentShowcase = async ({ title, type, subdiscipline_ids }: ContentShowcaseProps) => {
  let data

  // Первый запрос с фильтрами
  if (!type) {
    data = await getBlogList({ page_size: 8, subdiscipline_ids })
    // Если пусто — пробуем без фильтра
    if (!data?.results.length) {
      data = await getBlogList({ page_size: 8 })
    }
  } else {
    data = await getEventOrAreaList({ page_size: 8, subdiscipline_ids, type })
    // Если пусто — пробуем без фильтра
    if (!data?.results.length) {
      data = await getEventOrAreaList({ page_size: 8, type })
    }
  }

  if (!data?.results.length) {
    return null;
  }

  return (
    <section className="container content-showcase section-spacing-top section-spacing-bottom">
        <SectionTitle>{title}</SectionTitle>
        <ContentShowcaseSwiper data={data.results} type={type}/>
       <Link className="more-link content-showcase_hidden-desktop" href="/">смотреть все</Link>
    </section>
  )
}



export default ContentShowcase
