import { useToast } from '@/shared/context/toast/useToastContext';
import useModal from '@/shared/store/modal'
import { postResetPasswordRequest, ResetPasswordRequestType } from '@/shared/api/user/postResetPasswordRequest';
import { SubmitHandler, UseFormSetError } from 'react-hook-form';
import { useEmailFieldError } from '@/shared/hooks/useEmailFieldError'
import { LoginType } from '@/shared/api/user/postLogin'

type UseResetPasswordReturn = {
  onSubmit: SubmitHandler<ResetPasswordRequestType>;
  hasManualEmailError: boolean;
  setHasManualEmailError: (value: boolean) => void;
};

export const useResetPasswordRequest = (setError: UseFormSetError<ResetPasswordRequestType>): UseResetPasswordReturn => {
  const { hasManualEmailError, setHasManualEmailError, handleServerError } = useEmailFieldError<LoginType>();
  const { closeModal } = useModal();
  const { showToast } = useToast();

  const onSubmit: SubmitHandler<ResetPasswordRequestType> = async (data) => {
    setHasManualEmailError(false);
    try {
      const response = await postResetPasswordRequest(data);

      if (handleServerError(response, setError)) {
        return;
      }

      closeModal();
      showToast(response.message, 'success');
    } catch {
      showToast('Произошла ошибка при восстановлении пароля.', 'error');
    }
  };

  return {
    onSubmit,
    hasManualEmailError,
    setHasManualEmailError,
  };
};
