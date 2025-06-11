'use client';
import React, { createContext, useState, useCallback, ReactNode, useRef, useEffect, } from 'react';
import Toast from './ui/Toast';

import { ToastType, ToastMessage, ToastContextType } from './type';

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback(
    (message: string, type: ToastType = 'success') => {
      setToastMessage({ message, type });

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastMessage && (
        <Toast message={toastMessage.message} type={toastMessage.type} />
      )}
    </ToastContext.Provider>
  );
};

