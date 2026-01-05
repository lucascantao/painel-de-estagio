import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SkillsApiService {

  private readonly http = inject(HttpClient)
  private readonly PATH = ''

  constructor() { }

  public async skillsList(): Promise<any> {
    // return {
    //   status: 200,
    //   data: [
    //     { id: 1, name: 'JavaScript' },
    //     { id: 2, name: 'TypeScript' },
    //     { id: 3, name: 'Angular' },
    //     { id: 4, name: 'React' },
    //     { id: 5, name: 'Node.js' },
    //     { id: 6, name: 'PHP' },
    //     { id: 7, name: 'Python' }
    //   ]
    // }
    return firstValueFrom(await this.http.get<any>(`${this.PATH}/skills`));
  }

}
