import { useRouter } from 'next/navigation';
import { SubmitHandler, UseFormSetError } from 'react-hook-form';
import { RegisterUserType } from './type';
import { postRegister } from '@/shared/api/user/postRegister';
import { useToast } from '@/shared/context/toast/useToastContext';
import useModal from '@/shared/store/modal';
import { useEmailFieldError } from '@/shared/hooks/useEmailFieldError'
import { LoginType } from '@/shared/api/user/postLogin'

type UseRegisterReturn = {
  onSubmit: SubmitHandler<RegisterUserType>;
  hasManualEmailError: boolean;
  setHasManualEmailError: (value: boolean) => void;
};

export const useRegister = (setError: UseFormSetError<RegisterUserType>): UseRegisterReturn => {
  const { hasManualEmailError, setHasManualEmailError, handleServerError } = useEmailFieldError<LoginType>();
  const router = useRouter();
  const { showToast } = useToast();
  const { closeModal } = useModal();

  const onSubmit: SubmitHandler<RegisterUserType> = async (data) => {
    setHasManualEmailError(false);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { agreement, memberRightsAgreement, ...formData } = data;

      const response = await postRegister(formData);

      if (handleServerError(response, setError)) {
        return;
      }

      router.push('/profile');
      closeModal();
      showToast('Вы успешно зарегистрированы!', 'success');
    } catch {
      showToast('Произошла ошибка при регистрации.', 'error');
    }
  };

  return {
    onSubmit,
    hasManualEmailError,
    setHasManualEmailError,
  };
};
