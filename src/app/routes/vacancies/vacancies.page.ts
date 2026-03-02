import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ModulesService } from 'src/app/shared/services/utils/modules.service';
import { RouterModule } from "@angular/router";
import { PageHeaderComponent } from "src/app/shared/ui/components/page-header/page-header.component";


@Component({
  selector: 'app-internships',
  imports: [CommonModule, RouterModule, PageHeaderComponent],
  templateUrl: './vacancies.page.html',
  styleUrls: ['./vacancies.page.scss'],
})

export class VacanciesPage {

  private readonly modulesService: ModulesService = inject(ModulesService);


  ngOnInit() {
    this.modulesService.moduleName.set('vagas');
  }

}
