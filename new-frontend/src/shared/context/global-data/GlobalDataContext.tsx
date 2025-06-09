'use client';
import { createContext, ReactNode } from 'react'
import type { UserType} from '@/shared/api/user/getUser'
import type { ContactType } from '@/shared/api/static/getContact'

type GlobalDataContextType = {
  serverIsMobile: boolean;
  userData: UserType;
  staticContact: ContactType;
};

export const GlobalDataContext = createContext<GlobalDataContextType | undefined>(undefined);

type GlobalDataProviderProps = {
  children: ReactNode;
  serverIsMobile: boolean;
  userData: UserType;
  staticContact: ContactType;
};

export const GlobalDataProvider = ({ children, serverIsMobile, userData, staticContact}: GlobalDataProviderProps) => {

  return (
    <GlobalDataContext.Provider
      value={{
        serverIsMobile,
        userData,
        staticContact
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};
