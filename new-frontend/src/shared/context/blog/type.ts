import type { BlogListType, BlogListFilterType } from '@/shared/api/blog-new/list/type'

export type BlogDataContextType = {
  blogListData: BlogListType;
  blogFilters: BlogListFilterType;
  onFilterChange: <K extends keyof BlogListFilterType>(key: K, value: BlogListFilterType[K]) => void;
  isLoading: boolean;
};

