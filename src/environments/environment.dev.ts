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

// const BASE_URL = 'http://api-dev.conexaopovosdafloresta.org.br';
const BASE_URL = 'http://localhost:8000';
// const GEOSERVER_URL_TEMP = 'https://protecaoterritorial.conexaopovosdafloresta.org.br:9080';

export const API_BASE_URL = `${BASE_URL}/api`;
// export const GEOSERVER_URL = `${GEOSERVER_URL_TEMP}/geoserver`;
// export const GEE_IMAGE_API_BASE_URL = `${BASE_URL}/gee-api`;

export const PLANET_API_KEY = 'PLAK09a503e58b5140d7aeb34c26959d7430';

// export const URL_GEO_API = `${BASE_URL}:3000`;
// export const URL_GEO_API = `http://api-dev.conexaopovosdafloresta.org.br:3000`;
