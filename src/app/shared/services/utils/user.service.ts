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

  // public getUserName(): string | null {
  //   this.user = this.user === null ? this.storageService.load('user', 'local', null) : this.user;
  //   return this.user?.name;
  // }

  // public getEmail(): string | null {
  //   this.user = this.user === null ? this.storageService.load('user', 'local', null) : this.user;
  //   return this.user?.email;
  // }

  public getUserId(): number | null {
    const user: User = this.storageService.load('user', 'local', null);
    return user?.id;
  }

  public getRole() {
    const profileId = this.getUser()?.role.id;
    return profileRolesMap[profileId as keyof typeof profileRolesMap]
  }

  // public getAllUsers(page: number, perPage: number, search: string = null, sortColumn: string, direction: string): Observable<Page<User>> {
  //   return this.userApiService.getAllUsers(page, perPage, search, sortColumn, direction);
  // }

  // public getRoles(): Promise<Role[]> {
  //   return this.userApiService.getRoles();
  // }

  // public getPartners(): Promise<Partners[]> {
  //   return this.userApiService.getPartners();
  // }

  // public async createUser(form: { name: string, email: string, password: string, role: any, partner: any, address: string, phone: string }): Promise<void> {
  //   try {
  //     await this.userApiService.createUser(
  //       {
  //         name: form.name,
  //         email: form.email,
  //         password: form.password,
  //         roleId: form.role.value,
  //         partnerId: form.partner.value,
  //         address: form.address,
  //         phone: form.phone
  //       }
  //     )
  //     this.snackbar.open('Usuário criado com sucesso!', 'Fechar', {
  //         duration: 5000,
  //         horizontalPosition: 'center',
  //         verticalPosition: 'bottom',
  //         panelClass: ['snackbar-success']
  //       });
  //   }
  //   catch (error) {
  //     console.error(error);
  //     this.snackbar.open('Erro ao criar usuário!', 'Fechar', {
  //       duration: 5000,
  //       horizontalPosition: 'center',
  //       verticalPosition: 'bottom',
  //       panelClass: ['snackbar-error']
  //     });
  //   }
  // }

  // public async updateUserByAdmin(form: { name: string, email: string, password: string, role: any, partner: any, address: string, phone: string }, userEdited: User): Promise<void> {
  //   const payload = {
  //     name: form.name,
  //     email: form.email,
  //     password: form.password ,
  //     roleId: form.role.value,
  //     partnerId: form.partner.value,
  //     address: form.address || null,
  //     phone: form.phone || null,
  //     userId: userEdited.id,
  //     modifiedBy: this.getUserId()
  //      || 1,
  //   }

  //   if (form.password === '') delete payload.password;

  //   if (userEdited.email === form.email) delete payload.email;

  //   try {
  //     const user = await this.userApiService.updateUserByAdmin(payload);

  //     if(userEdited.id === this.getUserId()) {
  //       this.logoutAdmin(this.getUserId());
  //     }
  //     else {
  //       this.logoutOtherDevice(userEdited.id);
  //     }

  //     this.snackbar.open('Usuário atualizado com sucesso!', 'Fechar', {
  //       duration: 5000,
  //       horizontalPosition: 'center',
  //       verticalPosition: 'bottom',
  //       panelClass: ['snackbar-success']
  //     });
  //   }
  //   catch (error) {
  //     console.error(error);
  //     this.snackbar.open('Erro ao atualizar usuário!', 'Fechar', {
  //       duration: 5000,
  //       horizontalPosition: 'center',
  //       verticalPosition: 'bottom',
  //       panelClass: ['snackbar-error']
  //     });
  //   }
  // }

  // public async updateUser(password: string, email: string, name: string = null): Promise<void> {
  //   const payload = {
  //     email: email,
  //     name,
  //     userId: this.getUserId(),
  //     modifiedBy: this.getUserId()
  //   }

  //   if(email === this.getEmail()) delete payload.email;

  //   const user = await this.userApiService.updateUser(payload);
  //   this.snackbar.open('Usuário atualizado com sucesso!', 'Fechar', {
  //     duration: 5000,
  //     horizontalPosition: 'center',
  //     verticalPosition: 'bottom',
  //     panelClass: ['snackbar-success']
  //   })
  //   this.storageService.remove('user', 'local');
  //   this.storageService.save('user', user, 'local');
  //   this.refreshUser();
  // }

  // public async updatePassword(password: string, newPassword: string, confirmPassword: string): Promise<void> {
  //   await this.userApiService.updatePassword(this.getUserId(), password, newPassword, confirmPassword);
  //   this.snackbar.open('Usuário atualizado com sucesso!', 'Fechar', {
  //     duration: 5000,
  //     horizontalPosition: 'center',
  //     verticalPosition: 'bottom',
  //     panelClass: ['snackbar-success']
  //   })
  // }

  // public async deleteUser(userId: number): Promise<void> {
  //   try {
  //     await this.userApiService.deleteUser(userId);
  //     this.snackbar.open('Usuário excluido com sucesso!', 'Fechar', {
  //       duration: 5000,
  //       horizontalPosition: 'center',
  //       verticalPosition: 'bottom',
  //       panelClass: ['snackbar-success']
  //     })
  //   }
  //   catch (error) {
  //     console.error(error);
  //     this.snackbar.open('Erro ao excluir usuário!', 'Fechar', {
  //       duration: 5000,
  //       horizontalPosition: 'center',
  //       verticalPosition: 'bottom',
  //       panelClass: ['snackbar-error']
  //     });
  //   }
  // }

  // public async activateUser(userId: number): Promise<void> {
  //   await this.userApiService.activateUser(userId);
  // }

  // public async refreshUser(): Promise<void> {
  //   this.user = await this.findUser();
  //   console.log('refreshed user', this.user);
  //   this.userName.set(this.user?.name);
  // }

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
