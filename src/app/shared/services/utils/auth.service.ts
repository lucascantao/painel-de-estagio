import { inject, Injectable, signal } from "@angular/core";
import { StorageRepositoryService } from "src/app/shared/services/utils/storage.repository.service";
import { AuthApiService } from "../api/auth-api.service";
import { User } from "../../domain/interfaces/User.interface";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { profilePermissionsMap } from "../../domain/constants/user-constants";
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authApiService = inject(AuthApiService);
  private readonly userService = inject(UserService);
  private readonly storageService = inject(StorageRepositoryService);
  private readonly router = inject(Router);
  private readonly snackbar = inject(MatSnackBar);

  private user: User | null = null;
  private isAuthenticated = false;
  private authToken: string | null = null;

  public async login(email: string, password: string): Promise<void> {
    try {
      await this.authApiService.login(email, password);
      this.user = await this.userService.fetchAuthenticatedUser();
      this.isAuthenticated = true;
    }
    catch (error) {
      console.error(error);
      this.isAuthenticated = false;
      this.snackbar.open('Erro ao realizar login', 'Fechar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['snackbar-error']
      });
    }
    if(this.isAuthenticated) {
      this.router.navigate(['/home']);
    }
  }

  public async logout(): Promise<void> {
    await this.authApiService.logout();
    this.user = null;
    this.router.navigate(['autenticacao/login']);
  }

  public async register(userPayload: any): Promise<void> {
    try {
      const user = await this.authApiService.register(userPayload);
      // this.user = user;
      // this.isAuthenticated = true;
      // this.authToken = this.user.token;
      // this.storageService.save('authToken', this.authToken, 'local');
      // this.storageService.save('user', this.user, 'local');
      // this.userService.refreshUser();
      this.saveSessionData(user);
    }
    catch (error) {
      console.error(error);
      this.isAuthenticated = false;
      this.snackbar.open('Erro ao cadastrar usuário', 'Fechar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['snackbar-error']
      });
    }
    if(this.isAuthenticated) {
      this.router.navigate(['/autenticacao/login']);
    }
  }

  public handleWithoutAuthentication(): void {
    this.clearlocal();
    this.router.navigate(['autenticacao/login']);
  }

  public handleWithoutPermission(): void {
    this.clearlocal();
    this.router.navigate(['home']);
  }

  private clearlocal(): void {
    this.user = null;
    this.isAuthenticated = false;
  }

  public async forgotPassword(email: string): Promise<void> {
    try {
      await this.authApiService.forgotPassword(email);
      this.storageService.save('recoveryEmail', email, 'local');
      this.snackbar.open(
        'Um e-mail de recuperação foi enviado para o seu endereço de e-mail!',
        'Fechar',
        {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-success']
        }
      )
      this.router.navigate(['autenticacao/recuperacao-senha']);
    }
    catch (error: any) {
      const message = error?.error.message;
      this.snackbar.open(
        message,
        'Fechar',
        {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-error']
        }
      );
      return;
    }
  }

  public async resetPassword(token: string, password: string, confirmPassword: string): Promise<void> {
    try {
      const email = this.storageService.load('recoveryEmail', 'local', null);
      await this.authApiService.resetPassword(token, password, confirmPassword, email);
      this.storageService.remove('recoveryEmail', 'local');
      this.snackbar.open(
        'Senha alterada com sucesso!',
        'Fechar',
        {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-success']
        }
      );
      this.router.navigate(['autenticacao/login']);
    }
    catch (error: any) {
      const message = error?.error.message;
      this.snackbar.open(
        message,
        'Fechar',
        {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-error']
        }
      );
      return;
    }
  }

  public getIsAuthenticated(){
    this.isAuthenticated = this.userService.getUser() !== null;
    return this.isAuthenticated
  }

  public verifyPermission(currentRoute: string): boolean {
    const profileId = this.userService.getUser()?.role.id;
    console.log(profileId);
    return profileId && (profileId !== null) ? profilePermissionsMap[profileId as keyof typeof profilePermissionsMap]
      .some((route) => currentRoute.includes(route)) : false;
  }

  // redundant

  private saveSessionData(user: User): void {
    this.user = user;
    this.isAuthenticated = true;
    this.authToken = this.user.token;
    this.storageService.save('authToken', this.authToken, 'local');
    this.storageService.save('user', this.user, 'local');
  }

}
