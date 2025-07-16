'use client'
import { usePathname } from 'next/navigation'
import Breadcrumbs from '@/widgets/breadcrumbs'
import { legalRouteMap } from '../model/legalRoutes'

const BreadcrumbsClient = () => {
  const pathname = usePathname()
  const label = legalRouteMap[pathname].title

  return <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label }]} />
}

export default BreadcrumbsClient
