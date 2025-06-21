import { SubmitHandler, UseFormSetError } from 'react-hook-form';
import { useToast } from '@/shared/context/toast/useToastContext';
import useModal from '@/shared/store/modal';
import { useServerFieldErrors } from '@/shared/hooks/useServerFieldErrors'
import { patchUserUpdate, UserUpdateType } from '@/shared/api/user/patchUserUpdate'
import { useGlobalData } from '@/shared/context/global-data/useGlobalDataContext'

type UseLoginReturn = {
  onSubmit: SubmitHandler<UserUpdateType>;
  hasManualError: boolean;
  setHasManualError: (val: boolean) => void;
};

export const useUpdateInfo = (setError: UseFormSetError<UserUpdateType>): UseLoginReturn => {
  const { hasManualError, setHasManualError, handleServerError } = useServerFieldErrors<UserUpdateType>();
  const { closeModal } = useModal()
  const {showToast} = useToast()
  const {updateUserData, userData} = useGlobalData()

  const onSubmit: SubmitHandler<UserUpdateType> = async formData => {
    setHasManualError(false);

    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => {
        const currentValue = userData?.[key as keyof UserUpdateType];
        return value !== '' && value !== currentValue;
      })
    ) as UserUpdateType;

    if (Object.keys(filteredData).length === 0) {
      showToast('Нет изменений для сохранения', 'invalid');
      return;
    }


    try {
      const { status, data } = await patchUserUpdate(filteredData);

      if (status === 200) {
        closeModal()
        updateUserData(filteredData)
        showToast(data.message, 'success');
      } else {
        if (handleServerError(data, setError)) {
          return;
        }
      }

    } catch {
      showToast('Произошла ошибка при обновлений данных', 'error');
    }
  }

  return {
    onSubmit,
    hasManualError,
    setHasManualError,
  };
};
