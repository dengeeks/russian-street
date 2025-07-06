import { SubmitHandler, UseFormSetError } from 'react-hook-form';
import { JoinOrganizationType, postFeedbackOrganization } from '@/shared/api/feedback/postFeedbackOrganization'
import { useToast } from '@/shared/context/toast/useToastContext';
import useModal from '@/shared/store/modal';
import { useServerFieldErrors } from '@/shared/hooks/useServerFieldErrors'


type UseOrganizationReturn = {
  onSubmit: SubmitHandler<JoinOrganizationType>;
  hasManualError: boolean;
  setHasManualError: (value: boolean) => void;
};

export const useOrganization = (setError: UseFormSetError<JoinOrganizationType>): UseOrganizationReturn => {
  const { hasManualError, setHasManualError, handleServerError } = useServerFieldErrors<JoinOrganizationType>();
  const { showToast } = useToast();
  const { closeModal } = useModal();

  const onSubmit: SubmitHandler<JoinOrganizationType> = async (RegisterData) => {
    setHasManualError(false);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { agreement, memberRightsAgreement, ...formData } = RegisterData;

      const { data, status } = await postFeedbackOrganization(formData);

      if (status === 201) {
        showToast('Ваша заявка принята! Спасибо за обратную связь.', 'success')
        closeModal()
      } else if (status === 429) {
        showToast('Вы превысили лимит заявок. Пожалуйста, попробуйте снова через час.', 'invalid')
        closeModal()
      } else {
        if (handleServerError(data, setError)) {
          return
        }
      }
    } catch {
      showToast('Произошла ошибка при отправке.', 'error');
    }
  };

  return {
    onSubmit,
    hasManualError,
    setHasManualError,
  };
};
