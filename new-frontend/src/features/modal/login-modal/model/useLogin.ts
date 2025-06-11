import { useRouter } from 'next/navigation';
import { SubmitHandler, UseFormSetError } from 'react-hook-form';
import { LoginType, postLogin } from '@/shared/api/user/postLogin';
import { useToast } from '@/shared/context/toast/useToastContext';
import useModal from '@/shared/store/modal';
import { useEmailFieldError } from '@/shared/hooks/useEmailFieldError'

type UseLoginReturn = {
  onSubmit: SubmitHandler<LoginType>;
  hasManualEmailError: boolean;
  setHasManualEmailError: (val: boolean) => void;
};

export const useLogin = (setError: UseFormSetError<LoginType>): UseLoginReturn => {
  const { hasManualEmailError, setHasManualEmailError, handleServerError } = useEmailFieldError<LoginType>();
  const router = useRouter();
  const { showToast } = useToast();
  const { closeModal } = useModal();

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    setHasManualEmailError(false);
    try {
      const response = await postLogin(data);

      if (handleServerError(response, setError)) {
        return;
      }

      router.push("/profile");
      closeModal();
      showToast('Вы успешно вошли в систему!', 'success');
    } catch (error: unknown) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Произошла ошибка при авторизации.';

      setError('email', { type: 'manual', message });
      setError('password', { type: 'manual', message });
      setHasManualEmailError(true);
      showToast(message, 'invalid');
    }
  };

  return {
    onSubmit,
    hasManualEmailError,
    setHasManualEmailError,
  };
};
