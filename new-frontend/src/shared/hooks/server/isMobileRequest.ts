'use server';

import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';

export async function isMobileRequest(): Promise<boolean> {
  const headersList = await headers();
  const ua = headersList.get('user-agent') || '';
  const parser = UAParser(ua);
  const type = parser.device.type;
  return type === 'mobile' || type === 'tablet';
}
