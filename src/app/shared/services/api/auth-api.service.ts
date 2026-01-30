import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../../domain/interfaces/User.interface';
import { API_BASE_URL, SANCTUM_URL } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private readonly http = inject(HttpClient)
  private readonly PATH = ''

  constructor() { }

  public async login(email: string, password: string): Promise<User> {

    await firstValueFrom(
      this.http.get<any>(`${SANCTUM_URL}`, { withCredentials: true })
    ).then(() => {
      // CSRF cookie obtained
      console.log('CSRF cookie obtained');
    });

    return firstValueFrom(
      this.http.post<any>(`${API_BASE_URL}/login`, { email, password }, { withCredentials: true } )
    )
    .then((res: any) => {
      console.log('login response:', res);
      return {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        role: res.user.role,
        token: res.token,
        address: res.user.address,
        phone: res.user.phone,
        partnerName: res.user.partners_name
      } as User
    })
  }

  public async register(userPayload: any): Promise<User> {
    // TODO: código repetido com o login, refatorar
    return firstValueFrom(
      this.http.post<any>(`${API_BASE_URL}/register`, userPayload)
    )
    .then((res: any) => {
      return {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        role: res.user.role,
        token: res.token,
        address: res.user.address,
        phone: res.user.phone,
      } as User
    });
  }

  public async logout(): Promise<void> {
    return firstValueFrom(this.http.post<void>(`${API_BASE_URL}/logout`, {}))
  }

  public async forgotPassword(email: string): Promise<void> {
    return firstValueFrom(this.http.post<void>(`${API_BASE_URL}/forgot-password`, { email }))
  }

  public async resetPassword(token: string, password: string, confirmPassword: string, email: string): Promise<void> {
    return firstValueFrom(this.http.post<void>(`${API_BASE_URL}/reset-password`,
      {
       token,
       password,
       passwordConfirmation: confirmPassword,
       email
      }
    ));
  }
}
