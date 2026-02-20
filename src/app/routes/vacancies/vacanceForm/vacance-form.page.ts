import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HeaderComponent } from "src/app/shared/ui/components/header-title/header.component";
import { InputFieldComponent } from "src/app/shared/ui/components/input-field/input-field.component";
import { DateSelectFieldComponent } from "src/app/shared/ui/components/datepicker/date-select-field.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionButtonComponent } from "src/app/shared/ui/components/action-button/action-button.component";
import { VacanceService } from 'src/app/shared/services/utils/vacance.service';
import { MappedModule } from 'src/app/shared/domain/types';
import { MODULES } from 'src/app/shared/domain/constants/modules.constant';
import { ActivatedRoute, Router, RouterLinkWithHref } from "@angular/router";
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
  vacanceId: any;
  
  submitting: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
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

  ngOnInit() {
    this.vacanceId = this.activatedRoute.snapshot.paramMap.get('vacanceId');
    if(this.vacanceId) {
      this.vacanceService.getVacanceById(this.vacanceId).subscribe({
        next: (res) => {
          console.log(res);
          const decimalSalary = parseFloat(res.data.salary).toFixed(2).toString().replace('.', ',');
          const salalyFormatted = 'R$' + decimalSalary.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
          this.form.get('title').setValue(res.data.title);
          this.form.get('description').setValue(res.data.description);
          this.form.get('salary').setValue(salalyFormatted);
          this.form.get('numberOfPositions').setValue(res.data.number_of_positions);
          this.form.get('applicationDeadline').setValue(res.data.application_deadline);
          this.form.get('requirements').setValue(res.data.requirements);
        }
      });
    }
  }

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

      let vacancePromise: Promise<any>;
      
      if(this.vacanceId) {
        vacancePromise = this.vacanceService.updateVacance(vacancePayload, this.vacanceId);
      } else {
        vacancePromise = this.vacanceService.saveVacance(vacancePayload);
      }

      vacancePromise.then(
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
