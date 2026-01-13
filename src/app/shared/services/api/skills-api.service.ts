import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { API_BASE_URL } from "src/environments/environment.local";

@Injectable({
  providedIn: 'root'
})
export class SkillsApiService {

  private readonly http = inject(HttpClient)
  private readonly PATH = 'skill'

  constructor() { }

  public async skillsList(): Promise<any> {
    return firstValueFrom(await this.http.get<any>(`${API_BASE_URL}/${this.PATH}`));
  }

}
