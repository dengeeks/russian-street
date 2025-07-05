import { useState } from 'react';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { useToast } from '@/shared/context/toast/useToastContext';

type ServerErrorType = Record<string, string[] | string>;

export function useServerFieldErrors<T extends FieldValues>() {
  const [hasManualError, setHasManualError] = useState(false);
  const { showToast } = useToast();

  const handleServerError = (
    response: ServerErrorType,
    setError: UseFormSetError<T>
  ): boolean => {
    let hasError = false;

    for (const [key, value] of Object.entries(response)) {
      const message = Array.isArray(value) ? value[0] : value;
      setError(key as Path<T>, {
        type: 'manual',
        message,
      });
      showToast(message, 'invalid');
      hasError = true;
    }

    setHasManualError(hasError);
    return hasError;
  };

  return { hasManualError, setHasManualError, handleServerError };
}
