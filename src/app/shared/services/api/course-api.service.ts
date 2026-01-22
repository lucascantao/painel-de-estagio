import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { API_BASE_URL } from "src/environments/environment.local";

@Injectable({
  providedIn: 'root'
})
export class CourseApiService {

  private readonly http = inject(HttpClient)
  private readonly PATH = 'course'

  constructor() { }

  public async courseList(): Promise<any> {
    return firstValueFrom(await this.http.get<any>(`${API_BASE_URL}/${this.PATH}`));
  }

  public async updateUserCourse(userId: number, payload: any): Promise<any> {
    // console.log(payload);
    return firstValueFrom(await this.http.put<any>(`${API_BASE_URL}/${this.PATH}/user/${userId}`, payload));
  }

}
