import { BLOG_LIST } from '@/shared/api/endpoints'
import type { BlogListFilterType, BlogListType } from './type'
import { buildQueryString } from '@/shared/utils/buildQueryString'

export const EMPTY_BLOG_LIST: BlogListType = {
  count: 0,
  total_pages: 0,
  current_page: 0,
  results: []
}

export async function getBlogList(params: BlogListFilterType): Promise<BlogListType> {
  const queryString = buildQueryString(params)
  try {
    const res = await fetch(`${BLOG_LIST}?${queryString}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) return EMPTY_BLOG_LIST;

    return res.json()
  } catch {
    return EMPTY_BLOG_LIST;
  }
}