import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/shared/services/utils/auth.service';

export const xsrfInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = getCookie('XSRF-TOKEN');

  if (token) {
    req = req.clone({
      setHeaders: {
        'X-XSRF-TOKEN': decodeURIComponent(token),
      },
    });
  }

	req = req.clone({
    withCredentials: true
  });

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        authService.handleWithoutAuthentication();
      }
      return throwError(() => err);
    }),
  );
};

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}
