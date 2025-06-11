'use client';
import { createContext, ReactNode } from 'react'
import type { HomeType } from '@/shared/api/static/home/type'

type HomeDataContextType = {
  homeData: HomeType;
};

export const HomeDataContext = createContext<HomeDataContextType | undefined>(undefined);

type HomeDataProviderProps = {
  children: ReactNode;
  homeData: HomeType;
};

export const HomeDataProvider = ({ children, homeData}: HomeDataProviderProps) => {
  return (
    <HomeDataContext.Provider
      value={{
        homeData
      }}
    >
      {children}
    </HomeDataContext.Provider>
  );
};
