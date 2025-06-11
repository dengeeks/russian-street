export type ToastType = 'success' | 'error' | 'invalid';

export type ToastMessage = {
  message: string;
  type: ToastType;
}

export interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}
