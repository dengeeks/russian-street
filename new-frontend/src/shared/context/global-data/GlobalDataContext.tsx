'use client';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react'
import { getUser, UserType } from '@/shared/api/user/getUser'
import type { ContactType } from '@/shared/api/static/getContact'
import { usePathname } from 'next/navigation'

type GlobalDataContextType = {
  userData: UserType;
  staticContact: ContactType;
  updateUserData: (data: Partial<UserType>) => void;
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
    void fetchUser();
  }, [pathname, fetchUser]);

  const updateUserData = useCallback((data: Partial<UserType>) => {
    setUserData(prev => prev ? { ...prev, ...data } : prev);
  }, []);

  return (
    <GlobalDataContext.Provider
      value={{
        userData,
        staticContact,
        updateUserData,
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};
