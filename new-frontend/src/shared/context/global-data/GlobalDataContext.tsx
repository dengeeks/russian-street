'use client';
import { createContext, ReactNode } from 'react';

type GlobalDataContextType = {
  serverIsMobile: boolean;
};

export const GlobalDataContext = createContext<GlobalDataContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
  serverIsMobile: boolean;
};

export const GlobalDataProvider = ({ children, serverIsMobile }: AuthProviderProps) => {

  return (
    <GlobalDataContext.Provider
      value={{
        serverIsMobile
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};
