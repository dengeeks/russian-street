'use client'
import { createContext, ReactNode } from 'react'
import { useBlogListData, useBlogFilterFromQuery} from './hook'
import type { BlogDataContextType } from './type'

export const BlogDataContext = createContext<| BlogDataContextType | undefined>(undefined)

type Props = { children: ReactNode }

export const BlogDataProvider = ({ children }: Props) => {
  const { blogFilters, onFilterChange} = useBlogFilterFromQuery()
  const {blogListData, isLoading} = useBlogListData(blogFilters)

  return (
    <BlogDataContext.Provider value={{ blogFilters, onFilterChange, blogListData, isLoading }}>
      {children}
    </BlogDataContext.Provider>
  )
}
