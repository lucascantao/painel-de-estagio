import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ModulesService } from 'src/app/shared/services/utils/modules.service';

@Component({
  selector: 'app-internships',
  imports: [CommonModule],
  templateUrl: './internships.page.html',
  styleUrls: ['./internships.page.scss'],
})

export class InternshipsPage {

  private readonly modulesService: ModulesService = inject(ModulesService);


  ngOnInit() {
    this.modulesService.moduleName.set('estagios');
  }

}
