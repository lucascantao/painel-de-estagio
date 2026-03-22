import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { Page } from "../../domain/interfaces/Page.interface";
import { Internship } from "../../domain/interfaces/Internship.interface";
import { API_BASE_URL } from "src/environments/environment.prod";
import { ApiResponse } from "../../domain/interfaces/ApiResponse.interface";

@Injectable({
  providedIn: "root",
})

export class InternshipsApiService {

  constructor() {}

  private readonly http = inject(HttpClient)
  private readonly PATH = 'internship'

  public getInternshipById(internshipId: number): Observable<any> {
    return this.http.get<any>(`${API_BASE_URL}/${this.PATH}/${internshipId}`);
  }

  public getAllInternships(
    page: number,
    perPage: number,
    search: string = null,
    sort: string | null,
    direction: 'asc' | 'desc' | null,
    filters: any,
    userId: number
  ): Observable<ApiResponse<Internship>> {

    const params = {
      page: page.toString(),
      perPage: perPage.toString(),
    };

    if (sort && direction) {
      params['sort'] = sort;
      params['direction'] = direction;
    }

    const body = {
      userId: userId,
      search: search || '',
      // filters: filters
    }

    // if(status !== null && status !== undefined) {
    //   body['status'] = status;
    // }
    return this.http.post<ApiResponse<Internship>>(`${API_BASE_URL}/${this.PATH}/list`, body, { params });
  }

  public saveIntership(payload: any): Promise<any> {
    return firstValueFrom(this.http.post<any>(`${API_BASE_URL}/${this.PATH}`, payload));
  }

  public updateIntership(payload: any, internshipId: number): Promise<any> {
    return firstValueFrom(this.http.put<any>(`${API_BASE_URL}/${this.PATH}/${internshipId}`, payload));
  }

  public uploadDocument(file: any) {
    return this.http.post<any>(`${API_BASE_URL}/${this.PATH}/submit-docs`, file);
  }

  public downloadDocument(internshipId: number) {
    const url = `${API_BASE_URL}/${this.PATH}/download-docs/${internshipId}`;
    window.open(url, '_blank');
  }

  public updateInternshipStatus(payload: any): Promise<any> {
    return firstValueFrom(this.http.put<any>(`${API_BASE_URL}/${this.PATH}/update-status`, payload));
  }

}
