import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { InputFieldComponent } from "src/app/shared/ui/components/input-field/input-field.component";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { HeaderComponent } from "src/app/shared/ui/components/header-title/header.component";
import { Router, RouterLinkWithHref } from '@angular/router';
import { DateSelectFieldComponent } from "src/app/shared/ui/components/datepicker/date-select-field.component";
import { CompanyApiService } from 'src/app/shared/services/api/company-api.service';
import { SelectFieldComponent } from "src/app/shared/ui/components/select-field/select-field.component";
import { schedules } from 'src/app/shared/domain/constants/internship-constants';
import { MatCheckbox } from "@angular/material/checkbox";
import { ActionButtonComponent } from "src/app/shared/ui/components/action-button/action-button.component";
import { MappedModule } from 'src/app/shared/domain/types';
import { MODULES } from 'src/app/shared/domain/constants/modules.constant';
import { UserService } from 'src/app/shared/services/utils/user.service';
import { InternshipService } from 'src/app/shared/services/utils/internship.service';

@Component({
  selector: 'app-internship-form',
  imports: [
    CommonModule,
    MatIconModule,
    InputFieldComponent,
    ReactiveFormsModule,
    MatProgressSpinner,
    HeaderComponent,
    DateSelectFieldComponent,
    SelectFieldComponent,
    MatCheckbox,
    ActionButtonComponent,
    RouterLinkWithHref
],
  templateUrl: './internship-form.page.html',
  styleUrls: ['./internship-form.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternshipFormPage {
  MODULES: MappedModule = MODULES;

  iconRegistry: MatIconRegistry = inject(MatIconRegistry);
  sanitizer = inject(DomSanitizer);
  companyApiService: CompanyApiService = inject(CompanyApiService);
  userService: UserService = inject(UserService);
  internshipService: InternshipService = inject(InternshipService);

  internshipForm: FormGroup;
  companyForm: FormGroup;
  companySelectForm: FormGroup;

  companies: any[] = [];
  companyId: number | null = null;
  schedules: any[] = schedules;
  newCompany: boolean = false;

  submitting: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    // this.iconRegistry.addSvgIcon('exclamation', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/exclamation-icon.svg'));
  }

  ngOnInit(): void {
    this.companyApiService.companyList().then(companies => {
      this.companies = companies.data;
      this.cdr.markForCheck();
    });

    this.internshipForm = new FormGroup({
      workload: new FormControl('', [Validators.required]),
      schedule: new FormControl(null, [Validators.required]),
      salary: new FormControl('', [Validators.required]),
      supervisor: new FormControl('', [Validators.required]),
      startDate:  new FormControl('', [Validators.required]),
      endDate:  new FormControl('', [Validators.required]),
    });

    this.companyForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      cnpj: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    });

    this.companySelectForm = new FormGroup({
      company: new FormControl(null, [Validators.required]),
    })
  }

  submit() {
    this.submitting = true;

    const salary = this.internshipForm.get('salary').value;
    const salaryFormatted = salary.replace('R$', '').replace(/[.]/g, '').replace(',', '.');

    if((this.internshipForm.valid && this.companySelectForm.valid && !this.newCompany) 
      || (this.internshipForm.valid && this.newCompany && this.companyForm.valid)) {
      const internship = {
        ...this.internshipForm.value,
        salary: parseFloat(salaryFormatted),
        schedule: this.internshipForm.get('schedule').value.name,
        userId: this.userService.getUserId(),
        companyId: null,
        company: null,
      }

      if(this.newCompany) {
        internship.company = this.companyForm.value;  
      } else {
        internship.companyId = this.companyId;
      }

      this.internshipService.saveInternship(internship).then(
        res => {
          this.submitting = false;
          this.router.navigate(['/dashboard']);
        },
        err => {
          console.log('error');
          console.log(err);
          this.submitting = false;
        }
      );

      this.cdr.detectChanges();

    } else {
      this.internshipForm.markAllAsTouched();
      if(this.newCompany) {
        this.companyForm.markAllAsTouched();
      } else {
        this.companySelectForm.markAllAsTouched();
      }
      this.submitting = false;
      this.cdr.detectChanges();
    }

    
  }

  onChangeCompany(event: any) {
    this.companyId = event.value;
  }

  updateCheckNewCompany(newCompany: boolean) {
    this.newCompany = newCompany;
    if(newCompany) {
      this.companySelectForm.markAsUntouched();
    }
  }

}
