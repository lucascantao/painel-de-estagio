export const environment: {
  production: boolean,
  name: string,
  hmr: boolean,
  URL_ME?: string
} = {
  production: false,
  name: 'local',
  hmr: false,
};

const BASE_URL = 'http://localhost:8000';

export const API_BASE_URL = `${BASE_URL}/api`;
export const SANCTUM_URL = `${BASE_URL}/sanctum/csrf-cookie`;
