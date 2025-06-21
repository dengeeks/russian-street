import { useToast } from '@/shared/context/toast/useToastContext';
import useModal from '@/shared/store/modal'
import { postResetPasswordRequest, ResetPasswordRequestType } from '@/shared/api/user/postResetPasswordRequest';
import { SubmitHandler, UseFormSetError } from 'react-hook-form';
import { useServerFieldErrors } from '@/shared/hooks/useServerFieldErrors'

type UseResetPasswordReturn = {
  onSubmit: SubmitHandler<ResetPasswordRequestType>;
  hasManualError: boolean;
  setHasManualError: (value: boolean) => void;
};

export const useResetPasswordRequest = (setError: UseFormSetError<ResetPasswordRequestType>): UseResetPasswordReturn => {
  const { hasManualError, setHasManualError, handleServerError } = useServerFieldErrors<ResetPasswordRequestType>();
  const { closeModal } = useModal();
  const { showToast } = useToast();

  const onSubmit: SubmitHandler<ResetPasswordRequestType> = async (formData) => {
    setHasManualError(false);
    try {
      const {data, status } = await postResetPasswordRequest(formData)

      if (status === 200) {
        closeModal()
        showToast(data.message, 'success')
      } else {
        if (handleServerError(data, setError)) {
          return;
        }
      }
    } catch {
      showToast('Произошла ошибка при восстановлении пароля.', 'error')
    }
  };

  return {
    onSubmit,
    hasManualError,
    setHasManualError,
  };
};
