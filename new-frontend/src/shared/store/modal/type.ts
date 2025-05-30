type ModalType = 'edit-account-info' | 'register-user' | 'login-user' | 'donating' | 'join-organization' | 'reset-password-request' | null;

export type ModalState = {
  currentModal: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
};
