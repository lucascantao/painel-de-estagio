import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { Page } from "../../domain/interfaces/Page.interface";
import { Internship } from "../../domain/interfaces/Internship.interface";
import { API_BASE_URL } from "src/environments/environment.prod";
import { ApiResponse } from "../../domain/interfaces/ApiResponse.interface";
import { Vacance } from "../../domain/interfaces/Vacance.interface";

@Injectable({
  providedIn: "root",
})

export class VacanciesApiService {

  constructor() {}

  private readonly http = inject(HttpClient)
  private readonly PATH = 'vacance'

  public getVacanciesById(internshipId: number): Observable<any> {
    return this.http.get<any>(`${API_BASE_URL}/${this.PATH}/${internshipId}`);
  }

  public getAllVacancies(
    page: number,
    perPage: number,
    search: string = null,
    sort: string | null,
    direction: 'asc' | 'desc' | null,
    filters: any,
  ): Observable<ApiResponse<Vacance>> {

    const params = {
      page: page.toString(),
      perPage: perPage.toString(),
    };

    if (sort && direction) {
      params['sort'] = sort;
      params['direction'] = direction;
    }

    const body = {
      search: search || '',
    }
    return this.http.post<ApiResponse<Vacance>>(`${API_BASE_URL}/${this.PATH}/list`, body, { params });
  }

  public saveVacancies(payload: any): Promise<any> {
    return firstValueFrom(this.http.post<any>(`${API_BASE_URL}/${this.PATH}`, payload));
  }

  public updateVacancies(payload: any, id: number): Promise<any> {
    return firstValueFrom(this.http.put<any>(`${API_BASE_URL}/${this.PATH}/${id}`, payload));
  }

}
