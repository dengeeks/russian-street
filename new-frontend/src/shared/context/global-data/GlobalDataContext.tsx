'use client';
import { createContext, ReactNode } from 'react'
import { UserType} from '@/shared/api/user/getUser'

type GlobalDataContextType = {
  serverIsMobile: boolean;
  userData: UserType;
};

export const GlobalDataContext = createContext<GlobalDataContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
  serverIsMobile: boolean;
  userData: UserType;
};

export const GlobalDataProvider = ({ children, serverIsMobile, userData}: AuthProviderProps) => {

  return (
    <GlobalDataContext.Provider
      value={{
        serverIsMobile,
        userData
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};
