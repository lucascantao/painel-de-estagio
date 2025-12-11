import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ModulesService } from 'src/app/shared/services/utils/modules.service';


@Component({
  selector: 'app-vacance-form',
  imports: [CommonModule],
  templateUrl: './vacance-form.page.html',
  styleUrls: ['./vacance-form.page.scss'],
})

export class VacanceFormPage {

//   private readonly modulesService: ModulesService = inject(ModulesService);


  ngOnInit() {
    // this.modulesService.moduleName.set('vagas');
  }

}
