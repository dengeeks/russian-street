'use client';
import { useContext } from 'react';
import { BlogDataContext} from './BlogDataContext'

export const useBlogData = () => {
  const context = useContext(BlogDataContext);
  if (!context) throw new Error('useAuth must be used within useBlogData');
  return context;
};
