type ModalType = 'edit-account-info' | 'register-user' | 'login-user' | 'donating' | 'join-organization' | 'reset-password-request' | null;

export type ModalStateType = {
  currentModal: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
};
