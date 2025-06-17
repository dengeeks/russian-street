'use client';
import { useContext } from 'react';
import { HomeDataContext} from './HomeDataContext'

export const useHomeData = () => {
  const context = useContext(HomeDataContext);
  if (!context) throw new Error('use must be used within useHomeData');
  return context;
};
