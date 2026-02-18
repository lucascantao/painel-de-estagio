import { inject, Injectable } from "@angular/core";
import { InternshipsApiService } from "../api/internships-api.service";
import { Observable } from "rxjs";
import { Page } from "../../domain/interfaces/Page.interface";
import { ApiResponse } from "../../domain/interfaces/ApiResponse.interface";
import { Vacance } from "../../domain/interfaces/Vacance.interface";
import { VacanciesApiService } from "../api/vacancies-api.service";

@Injectable({
  providedIn: "root",
})

export class VacanceService {

  constructor() {}

  private readonly vacanciesApiService = inject(VacanciesApiService);

  getVacanceById(internshipId: number): Observable<any> {
    return this.vacanciesApiService.getVacanciesById(internshipId);
  }

  public getAllVacancies(
    page: number,
    perPage: number,
    search: string = '',
    sort: string | null,
    direction: 'asc' | 'desc' | null,
    filters: any,
    userId: number
  ): Observable<ApiResponse<Vacance>> {
    return this.vacanciesApiService.getAllVacancies(page, perPage, search, sort, direction, filters);
  }


    
  public saveVacance(vacance: any) {
    console.log(vacance);
    return this.vacanciesApiService.saveVacancies(vacance);
  }
}
