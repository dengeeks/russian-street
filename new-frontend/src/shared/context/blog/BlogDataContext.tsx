'use client'
import { createContext, ReactNode } from 'react'
import { useBlogListData, useBlogFilters } from './hook'
import { BlogDataContextType } from './type'

export const BlogDataContext = createContext<| BlogDataContextType | undefined>(undefined)

type Props = { children: ReactNode }

export const BlogDataProvider = ({ children }: Props) => {
  const { blogFilters, onFilterChange} = useBlogFilters()
  const {blogListData, isLoading} = useBlogListData(blogFilters)

  return (
    <BlogDataContext.Provider value={{ blogFilters, onFilterChange, blogListData, isLoading }}>
      {children}
    </BlogDataContext.Provider>
  )
}
