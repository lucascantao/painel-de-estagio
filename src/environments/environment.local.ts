export const environment: {
  production: boolean,
  name: string,
  hmr: boolean,
  URL_ME?: string
} = {
  production: false,
  name: 'main',
  hmr: false,
};

const BASE_URL = 'http://povos-da-floresta-portal-de-gestao.solved.eco.br';

export const API_BASE_URL = `http://localhost:8000/api`;
export const GEOSERVER_URL = `${BASE_URL}/geoserver`;
export const GEE_IMAGE_API_BASE_URL = `${BASE_URL}/gee-api`;

export const PLANET_API_KEY = 'PLAK09a503e58b5140d7aeb34c26959d7430';

export const URL_GEO_API = `${BASE_URL}/dirt`;
