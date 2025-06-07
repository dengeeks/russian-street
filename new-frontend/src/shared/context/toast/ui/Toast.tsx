import { memo } from 'react';
import './toast.css';
import Image from 'next/image';
import { ToastMessage } from '../type'

const Toast = memo(({ message, type }: ToastMessage) => {
  return (
    <div id="toastBox">
      <div className={`toast ${type}`}>
        <Image src={`/toast/${type}.png`} alt={type} height={24} width={24} />
        {message}
      </div>
    </div>
  );
});
Toast.displayName = 'Toast';

export default Toast;
