import { inject, Injectable, signal } from "@angular/core";
import { StorageRepositoryService } from "./storage.repository.service";
import { Partners, Role, User } from "../../domain/interfaces/User.interface";
import { UserApiService } from "../api/user-api.service";
import { profilePermissionsMap, profileRolesMap } from "../../domain/constants/user-constants";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "./auth.service";
import { AuthApiService } from "../api/auth-api.service";
import { Router } from "@angular/router";
// import { Page } from "../../domain/interfaces/Page.interface";
import { Observable } from "rxjs";
import { ApiResponse } from "../../domain/interfaces/ApiResponse.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userName = signal<string | null>(null);
  private readonly storageService = inject(StorageRepositoryService);
  private readonly authApiService = inject(AuthApiService);
  private readonly userApiService = inject(UserApiService);
  private readonly snackbar = inject(MatSnackBar);
  private readonly router = inject(Router);

  private user: User | null = null;

  public getUser(): User | null {
    return this.user;
  }

  public getUserId(): number | null {
    // const user: User = this.storageService.load('user', 'local', null);
    return this.user?.id;
  }

  public getAllStudents(
    page: number,
    perPage: number,
    search: string = '',
    sort: string | null,
    direction: 'asc' | 'desc' | null,
    filters: any
  ): Observable<ApiResponse<User>> {
    return this.userApiService.getAllStudents(page, perPage, search, sort, direction, filters);
  }

  public getRole() {
    const profileId = this.getUser()?.role.id;
    return profileRolesMap[profileId as keyof typeof profileRolesMap]
  }

  public async fetchAuthenticatedUser(): Promise<User> {
    this.user = await this.userApiService.me().then((user) => {
      this.userName.set(user.name);
      return user;
    });

    return this.user;
  }

  private async logoutOtherDevice(): Promise<void> {
    await this.authApiService.logout();
  }

  private async logoutAdmin(): Promise<void> {
    await this.authApiService.logout();
    this.storageService.remove('authToken', 'local');
    this.storageService.remove('user', 'local');
    this.router.navigate(['autenticacao/login']);
  }
}
