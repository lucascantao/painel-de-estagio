import { HttpClient } from "@angular/common/http"
import { inject, Injectable } from "@angular/core"
import { API_BASE_URL } from "src/environments/environment.prod"
import { Partners, Role, User, UserRegister } from "../../domain/interfaces/User.interface"
import { firstValueFrom, Observable } from "rxjs"
import { ApiResponse } from "../../domain/interfaces/ApiResponse.interface"
// import { Page } from "../../domain/interfaces/Page.interface"

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private readonly http = inject(HttpClient)
  private readonly PATH = 'user'

  constructor() { }

  public getAllStudents(
    page: number,
    perPage: number,
    search: string = null,
    sort: string | null,
    direction: 'asc' | 'desc' | null,
    filters: any,
  ): Observable<ApiResponse<User>> {

    const params = {
      page: page.toString(),
      perPage: perPage.toString(),
    };

    if (sort && direction) {
      params['sort'] = sort;
      params['direction'] = direction;
    }

    const body = {
      filters: {
        ...filters,
        search: search || '',
      }
    }
    return this.http.post<ApiResponse<User>>(`${API_BASE_URL}/${this.PATH}/students`, body, { params: params });
  }

  public async me(): Promise<User> {
    return firstValueFrom(this.http.get<User>(`${API_BASE_URL}/${this.PATH}/me`))
  }
}
