import { HttpClient } from "@angular/common/http"
import { inject, Injectable } from "@angular/core"
import { API_BASE_URL } from "src/environments/environment.dev"
import { Partners, Role, User, UserRegister } from "../../domain/interfaces/User.interface"
import { firstValueFrom, Observable } from "rxjs"
// import { Page } from "../../domain/interfaces/Page.interface"

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private readonly http = inject(HttpClient)
  private readonly PATH = 'user'

  constructor() { }

  // public getAllUsers(page: number, perPage: number, search: string = null, sortColumn?: string, sortDirection?: string): Observable<Page<User>> {

  //   if (sortColumn && sortDirection) {
  //     const params = {
  //       page: page.toString(),
  //       perPage: perPage.toString(),
  //       search: search || '',
  //       sort: sortColumn,
  //       direction: sortDirection
  //     };
  //     return this.http.get<Page<User>>(`${API_BASE_URL}/${this.PATH}`, { params });
  //   } else {
  //     const params = {
  //       page: page.toString(),
  //       perPage: perPage.toString(),
  //       search: search || ''
  //     };
  //     return this.http.get<Page<User>>(`${API_BASE_URL}/${this.PATH}`, { params });
  //   }
  // }

  // public getRoles(): Promise<Role[]> {
  //   return firstValueFrom(this.http.get<Role[]>(`${API_BASE_URL}/${this.PATH}/roles`));
  // }

  // public getPartners(): Promise<Partners[]> {
  //   return firstValueFrom(this.http.get<Partners[]>(`${API_BASE_URL}/${this.PATH}/partners`));
  // }

  public async getUser(userId: number): Promise<User> {
    return firstValueFrom(this.http.get<User>(`${API_BASE_URL}/${this.PATH}/${userId}`))
  }

  // public async createUser(payload: UserRegister): Promise<User> {
  //   return firstValueFrom(this.http.post<User>(`${API_BASE_URL}/${this.PATH}`, payload))
  // }

  // public async updatePassword(userId: number, currentPassword: string, password: string, passwordConfirmation: string): Promise<User> {
  //   return firstValueFrom(this.http.patch<User>(`${API_BASE_URL}/${this.PATH}/update-password`, { userId, currentPassword, password, passwordConfirmation }))
  // }

  // public async updateUser(payload: { email?: string, name: string, userId: number, modifiedBy: number }): Promise<User> { // { email: string, name: string, userId: number, modifiedBy: string }): Promise<User> {
  //   return firstValueFrom(this.http.put<User>(`${API_BASE_URL}/${this.PATH}`, payload))
  // }

  // public async updateUserByAdmin(payload: { email: string, name: string, password?: string, modifiedBy: number, partnerId: number, address?: string, phone?: string, roleId: number }): Promise<User> {
  //   return firstValueFrom(this.http.put<User>(`${API_BASE_URL}/${this.PATH}`, payload))
  // }

  // public async deleteUser(userId: number): Promise<User> {
  //   return firstValueFrom(this.http.delete<User>(`${API_BASE_URL}/${this.PATH}/${userId}`))
  // }

  // public async activateUser(userId: number): Promise<User> {
  //   return firstValueFrom(this.http.patch<User>(`${API_BASE_URL}/${this.PATH}/${userId}/activate`, { userId }));
  // }
}
