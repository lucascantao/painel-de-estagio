import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ModulesService } from 'src/app/shared/services/utils/modules.service';
import { VacanciesTableComponent } from './components/table/table.component';


@Component({
  selector: 'app-internships',
  imports: [CommonModule, VacanciesTableComponent],
  templateUrl: './vacancies.page.html',
  styleUrls: ['./vacancies.page.scss'],
})

export class InternshipsPage {

  private readonly modulesService: ModulesService = inject(ModulesService);


  ngOnInit() {
    this.modulesService.moduleName.set('estagios');
  }

}
