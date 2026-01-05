import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { AuthService } from "src/app/shared/services/utils/auth.service";
// import { GEE_IMAGE_API_BASE_URL, URL_GEO_API } from "src/environments/environment.dev";

export const authHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const exceptionHosts = [
    // URL_GEO_API,
    // GEE_IMAGE_API_BASE_URL,
    // 'geoserver',
    // 'api.planet',
    // 'earthengine',
    // 'mapbiomas.org',
    '/login',
    '/register',
    '/forgot-password',
    '/verify-token',
    '/reset-password'
  ];

  const shouldAddToken = !exceptionHosts.some(host =>
    req.url.includes(host)
  );

  const token = shouldAddToken ? authService.verifyAuthentication() : null;

  if (token) {
    req = req.clone(
      {
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      }
    )
  }

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        authService.handleWithoutAuthentication();
      }
      return throwError(() => err);
    })
  );
}
