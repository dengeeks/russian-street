import { useRouter } from 'next/navigation';
import { SubmitHandler, UseFormSetError } from 'react-hook-form';
import { RegisterUserType } from './type';
import { postRegister } from '@/shared/api/user/postRegister';
import { useToast } from '@/shared/context/toast/useToastContext';
import useModal from '@/shared/store/modal';
import { useServerFieldErrors } from '@/shared/hooks/useServerFieldErrors'
import useOAuth2 from '@/shared/store/OAuth2'

type UseRegisterReturn = {
  onSubmit: SubmitHandler<RegisterUserType>;
  hasManualError: boolean;
  setHasManualError: (value: boolean) => void;
};

export const useRegister = (setError: UseFormSetError<RegisterUserType>): UseRegisterReturn => {
  const { hasManualError, setHasManualError, handleServerError } = useServerFieldErrors<RegisterUserType>();
  const router = useRouter();
  const { showToast } = useToast();
  const { closeModal } = useModal();
  const {toggleTriggerOAuth2} = useOAuth2();

  const onSubmit: SubmitHandler<RegisterUserType> = async (RegisterData) => {
    setHasManualError(false);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { agreement, memberRightsAgreement, ...formData } = RegisterData;

      const { data, status } = await postRegister(formData);

      if (status === 201) {
        router.push('/profile');
        closeModal();
        toggleTriggerOAuth2()
        showToast('Вы успешно зарегистрированы!', 'success');

      } else {
        if (handleServerError(data, setError)) {
          return;
        }
      }
    } catch {
      showToast('Произошла ошибка при регистрации.', 'error');
    }
  };

  return {
    onSubmit,
    hasManualError,
    setHasManualError,
  };
};
