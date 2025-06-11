import type { ComponentType } from 'react';

import dynamic from 'next/dynamic';

type DynamicWithPreload = ComponentType & {
  preload?: () => Promise<void>;
};

export const modalComponents: Record<string, DynamicWithPreload> = {
  'edit-account-info': dynamic(() => import('@/features/modal/edit-account-info-modal'), { ssr: false }),
  'register-user': dynamic(() => import('@/features/modal/register-modal'), { ssr: false }),
  'login-user': dynamic(() => import('@/features/modal/login-modal'), { ssr: false }),
  'donating': dynamic(() => import('@/features/modal/donation-modal'), { ssr: false }),
  'join-organization': dynamic(() => import('@/features/modal/join-organization-modal'), { ssr: false }),
  'reset-password-request': dynamic(() => import('@/features/modal/reset-password-modal/ui/ResetPasswordRequest'), { ssr: false }),
};

