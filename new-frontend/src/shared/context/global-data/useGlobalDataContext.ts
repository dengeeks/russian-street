'use client';
import { useContext } from 'react';
import { GlobalDataContext} from './GlobalDataContext'

export const useGlobalData = () => {
  const context = useContext(GlobalDataContext);
  if (!context) throw new Error('useAuth must be used within useGlobalData');
  return context;
};
