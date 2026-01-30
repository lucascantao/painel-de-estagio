import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient, withFetch, withInterceptors, withXsrfConfiguration } from '@angular/common/http';

import { routes } from './app.routes';
// import { loadingHttpInterceptor } from './core/providers/interceptors/loading-http.interceptor';
import { authHttpInterceptor } from './core/providers/interceptors/auth-http.interceptor';
import { xsrfInterceptor } from './core/providers/interceptors/xsrf-http.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
      withInterceptors([
        // loadingHttpInterceptor, 
        authHttpInterceptor,
        xsrfInterceptor
      ]),
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN'
      })
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
    ),
    // provideAnimationsAsync(),
  ]
};
