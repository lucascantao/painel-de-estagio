import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ModulesService } from 'src/app/shared/services/utils/modules.service';
import { HeaderComponent } from "src/app/shared/ui/components/header-title/header.component";
import { InputFieldComponent } from "src/app/shared/ui/components/input-field/input-field.component";
import { DateSelectFieldComponent } from "src/app/shared/ui/components/datepicker/date-select-field.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-vacance-form',
  imports: [CommonModule, HeaderComponent, InputFieldComponent, DateSelectFieldComponent, ReactiveFormsModule],
  templateUrl: './vacance-form.page.html',
  styleUrls: ['./vacance-form.page.scss'],
})

export class VacanceFormPage {

//   private readonly modulesService: ModulesService = inject(ModulesService);


  form: FormGroup;

  constructor() { 
    this.form = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      salary: new FormControl(''),
      numberOfPositions: new FormControl(''),
      deadlineDate: new FormControl(''),
      requirements: new FormControl(''),
    });
  }

  ngOnInit() {

    // this.modulesService.moduleName.set('vagas');
  }

}
