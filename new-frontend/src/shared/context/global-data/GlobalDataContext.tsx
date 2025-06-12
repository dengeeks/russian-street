'use client';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react'
import { getUser, UserType } from '@/shared/api/user/getUser'
import type { ContactType } from '@/shared/api/static/getContact'
import { usePathname } from 'next/navigation'

type GlobalDataContextType = {
  userData: UserType;
  staticContact: ContactType;
};

export const GlobalDataContext = createContext<GlobalDataContextType | undefined>(undefined);

type GlobalDataProviderProps = {
  children: ReactNode;
  staticContact: ContactType;
};

export const GlobalDataProvider = ({ children, staticContact}: GlobalDataProviderProps) => {

  const [userData, setUserData] = useState<UserType | null>(null);
  const pathname = usePathname();

  const fetchUser = useCallback(async () => {
    const user = await getUser();
    setUserData(user);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [pathname, fetchUser]);

  return (
    <GlobalDataContext.Provider
      value={{
        userData,
        staticContact
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};
