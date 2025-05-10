import localFont from 'next/font/local';

export const Bahnschrift = localFont({
  src: [
    {
      path: './Bahnschrift/Bahnschrift.ttf',
      weight: '100 900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-Bahnschrift',
});

export const Benzin = localFont({
  src: [
    {
      path: './benzin/benzin-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './benzin/benzin-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-Benzin',
});

export const Inter = localFont({
  src: [
    {
      path: './Inter/Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Inter/Inter-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './Inter/Inter-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-Inter',
});