import { useCallback, useEffect, useState } from 'react'
import type { BlogListFilterType, BlogListType } from '@/shared/api/blog-new/list/type';
import { getBlogList, EMPTY_BLOG_LIST } from '@/shared/api/blog-new/list/getBlogList'

export function useBlogListData(filter: BlogListFilterType) {
  const [blogListData, setBlogListData] = useState<BlogListType>(EMPTY_BLOG_LIST);
  const [isLoading, setIsLoading] = useState(true)

  const fetchBlogList = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await getBlogList(filter)
      setBlogListData(data)
    } finally {
      setIsLoading(false)
    }
  }, [filter])

  useEffect(() => {
    void fetchBlogList();
  }, [fetchBlogList]);

  return {
    blogListData,
    isLoading,
  }
}
