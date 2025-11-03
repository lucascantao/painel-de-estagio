import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "src/app/shared/services/utils/auth.service";

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getIsAuthenticated()) {
    return true;
  }
  else {
    router.navigate(['/autenticacao/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
};
