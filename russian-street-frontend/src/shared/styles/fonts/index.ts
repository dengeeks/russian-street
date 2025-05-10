import localFont from 'next/font/local';

export const MuseoSansCyrl = localFont({
  src: [
    {
      path: './MuseoSansCyrl-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './MuseoSansCyrl-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-MuseoSansCyrl',
});
