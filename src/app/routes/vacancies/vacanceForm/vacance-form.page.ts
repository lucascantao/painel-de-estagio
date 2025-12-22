import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HeaderComponent } from "src/app/shared/ui/components/header-title/header.component";
import { InputFieldComponent } from "src/app/shared/ui/components/input-field/input-field.component";
import { DateSelectFieldComponent } from "src/app/shared/ui/components/datepicker/date-select-field.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionButtonComponent } from "src/app/shared/ui/components/action-button/action-button.component";
import { VacanceService } from 'src/app/shared/services/utils/vacance.service';
import { MappedModule } from 'src/app/shared/domain/types';
import { MODULES } from 'src/app/shared/domain/constants/modules.constant';
import { Router, RouterLinkWithHref } from "@angular/router";
import { MatProgressSpinner } from "@angular/material/progress-spinner";


@Component({
  selector: 'app-vacance-form',
  imports: [CommonModule, HeaderComponent, InputFieldComponent, DateSelectFieldComponent, ReactiveFormsModule, ActionButtonComponent, RouterLinkWithHref, MatProgressSpinner],
  templateUrl: './vacance-form.page.html',
  styleUrls: ['./vacance-form.page.scss'],
})

export class VacanceFormPage {
  MODULES: MappedModule = MODULES

  private readonly vacanceService: VacanceService = inject(VacanceService);
  form: FormGroup;
  
  submitting: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { 
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required]),
      numberOfPositions: new FormControl('', [Validators.required]),
      applicationDeadline: new FormControl('', [Validators.required]),
      requirements: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {}

  submit() {
    this.submitting = true;
    if(this.form.valid) {
      const salary = this.form.get('salary').value;
      const salaryFormatted = salary.replace('R$', '').replace(/[.]/g, '').replace(',', '.');
      const vacancePayload = {
        ...structuredClone(this.form.value),
        numberOfPositions: parseInt(this.form.get('numberOfPositions').value),
        salary: parseFloat(salaryFormatted)
      };
      console.log(vacancePayload);
      this.vacanceService.saveVacance(vacancePayload).then(
        res => {
          this.submitting = false;
          this.router.navigate(['/vagas']);
        },
        err => {
          console.log('error');
          console.log(err);
          this.submitting = false;
        }
      );
    } else {
      this.form.markAllAsTouched();
      this.submitting = false;
      this.cdr.detectChanges();
    }
  }

}
