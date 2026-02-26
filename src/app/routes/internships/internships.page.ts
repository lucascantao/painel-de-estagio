import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ModulesService } from 'src/app/shared/services/utils/modules.service';
import { InternshipsTableComponent } from "./components/table/table.component";
import { PageHeaderComponent } from "./components/page-header/page-header.component";

@Component({
  selector: 'app-internships',
  imports: [CommonModule, InternshipsTableComponent, PageHeaderComponent],
  templateUrl: './internships.page.html',
  styleUrls: ['./internships.page.scss'],
})

export class InternshipsPage {

  private readonly modulesService: ModulesService = inject(ModulesService);


  ngOnInit() {
    this.modulesService.moduleName.set('estagios');
  }

}
