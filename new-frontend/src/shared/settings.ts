export const PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost';
export const DOCKER_API_BASE_URL = process.env.INTERNAL_DOCKER_API_URL || 'http://backend:8003';

export const ACCESS_TOKEN= process.env.NEXT_PUBLIC_ACCESS_TOKEN || 'access'
export const REFRESH_TOKEN= process.env.NEXT_PUBLIC_REFRESH_TOKEN || 'refresh'


