import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "src/app/shared/services/utils/auth.service";

export const permissionGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentRoute = state.url;

  if (
    authService.getIsAuthenticated() &&
    authService.verifyPermission(currentRoute)
  ) {
    return true;
  }

  return false;
};

