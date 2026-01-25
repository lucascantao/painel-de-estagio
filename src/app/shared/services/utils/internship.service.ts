import { inject, Injectable } from "@angular/core";
import { InternshipsApiService } from "../api/internships-api.service";
import { Observable } from "rxjs";
import { Internship } from "../../domain/interfaces/Internship.interface";
import { Page } from "../../domain/interfaces/Page.interface";
import { ApiResponse } from "../../domain/interfaces/ApiResponse.interface";

@Injectable({
  providedIn: "root",
})

export class InternshipService {

  constructor() {}

  private readonly internshipsApiService = inject(InternshipsApiService);

  getInternshipById(internshipId: number): Observable<Internship> {
    return this.internshipsApiService.getInternshipById(internshipId);
  }

  public getAllInternships(
    page: number,
    perPage: number,
    search: string = '',
    sort: string | null,
    direction: 'asc' | 'desc' | null,
    filters: any,
    userId: number
  ): Observable<ApiResponse<Internship>> {
    return this.internshipsApiService.getAllInternships(page, perPage, search, sort, direction, filters, userId);
  }

  public saveInternship(internship: any) {
    return this.internshipsApiService.saveIntership(internship);
  }

  public uploadDocument(file: any) {
    return this.internshipsApiService.uploadDocument(file);
  }
}
