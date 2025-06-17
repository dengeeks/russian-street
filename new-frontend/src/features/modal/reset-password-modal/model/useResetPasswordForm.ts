import { useRouter } from 'next/navigation';
import { useToast } from '@/shared/context/toast/useToastContext';
import { postResetPasswordConfirm } from '@/shared/api/user/postResetPasswordConfirm';
import { ResetPasswordFormType } from './type';
import { SubmitHandler } from 'react-hook-form';

interface UseResetPasswordFormProps {
  uid: string;
  token: string;
}

export const useResetPasswordForm = ({
                                       uid,
                                       token,
                                     }: UseResetPasswordFormProps) => {
  const { showToast } = useToast();
  const router = useRouter();

  const close = () => {
    router.push('/');
  };

  const onSubmit: SubmitHandler<ResetPasswordFormType> = async (data) => {
    try {
      const response = await postResetPasswordConfirm({
        uid,
        token,
        new_password: data.password,
      });

      close();
      showToast(response.message, 'success');
    } catch (error: unknown) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Произошла ошибка при восстановлении пароля.';
      showToast(message, 'error');
    }
  };

  return { onSubmit, close };
};
