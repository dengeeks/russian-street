import { useState } from 'react';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { useToast } from '@/shared/context/toast/useToastContext';

type EmailErrorType = { email?: string[] };

export function useEmailFieldError<T extends FieldValues>() {
  const [hasManualEmailError, setHasManualEmailError] = useState(false);
  const { showToast } = useToast();

  const handleServerError = (
    response: EmailErrorType,
    setError: UseFormSetError<T>
  ): boolean => {
    if (response?.email?.length) {
      setError('email' as Path<T>, {
        type: 'manual',
        message: response.email[0],
      });
      setHasManualEmailError(true);
      showToast(response.email[0], 'invalid');
      return true;
    }
    return false;
  };

  return { hasManualEmailError, setHasManualEmailError, handleServerError };
}
