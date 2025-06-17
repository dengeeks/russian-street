'use client';
import useModal from '@/shared/store/modal';
import { modalComponents } from './modalComponents';
import { useBodyScrollLock } from '@/shared/hooks/useBodyScrollLock';

const ModalManager = () => {
  const { currentModal } = useModal();

  useBodyScrollLock(Boolean(currentModal));

  if (!currentModal) return null;

  const ModalComponent = modalComponents[currentModal];

  return (
        <ModalComponent />
  );
};

export default ModalManager;
