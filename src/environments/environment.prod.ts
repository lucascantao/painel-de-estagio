export const environment: {
  production: boolean,
  name: string,
  hmr: boolean,
  URL_ME?: string
} = {
  production: true,
  name: 'main',
  hmr: false,
};

const BASE_URL = 'https://api.m41d.com';

export const API_BASE_URL = `${BASE_URL}/api`;
export const SANCTUM_URL = `${BASE_URL}/sanctum/csrf-cookie`;
