'use client';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react'
import { UserType, getUser } from '@/shared/api/user/getUser'
import { usePathname } from 'next/navigation'

type GlobalDataContextType = {
  serverIsMobile: boolean;
  userData: UserType;
};

export const GlobalDataContext = createContext<GlobalDataContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
  serverIsMobile: boolean;

};

export const GlobalDataProvider = ({ children, serverIsMobile}: AuthProviderProps) => {
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
        serverIsMobile,
        userData
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};
