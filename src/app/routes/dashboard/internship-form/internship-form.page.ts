import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { InputFieldComponent } from "src/app/shared/ui/components/input-field/input-field.component";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { HeaderComponent } from "src/app/shared/ui/components/header-title/header.component";
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
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
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-internship-form',
  imports: [
    CommonModule,
    MatIconModule,
    InputFieldComponent,
    ReactiveFormsModule,
    MatProgressSpinner,
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

  private readonly snackbar = inject(MatSnackBar);
  iconRegistry: MatIconRegistry = inject(MatIconRegistry);
  sanitizer = inject(DomSanitizer);
  companyApiService: CompanyApiService = inject(CompanyApiService);
  userService: UserService = inject(UserService);
  internshipService: InternshipService = inject(InternshipService);

  internshipForm: FormGroup;
  internshipId: any;
  companyForm: FormGroup;
  companySelectForm: FormGroup;

  companies: any[] = [];
  companyId: number | null = null;
  schedules: any[] = schedules;
  newCompany: boolean = false;

  submitting: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // this.iconRegistry.addSvgIcon('exclamation', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/exclamation-icon.svg'));
    this.initializeForms();
  }

  async ngOnInit() {
    this.submitting = true;
    await this.companyApiService.companyList().then(companies => {
      this.companies = companies.data;
      this.cdr.markForCheck();
    });

    this.internshipId = this.activatedRoute.snapshot.paramMap.get('internshipId');
    if(this.internshipId) {
      await this.internshipService.getInternshipById(this.internshipId).subscribe(res => {
        const decimalSalary = parseFloat(res.data.salary).toFixed(2).toString().replace('.', ',');
        const salalyFormatted = 'R$' + decimalSalary.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        this.internshipForm.get('workload').setValue(res.data.workload);
        this.internshipForm.get('schedule').setValue(this.schedules.find(s => s.name === res.data.schedule));
        this.internshipForm.get('salary').setValue(salalyFormatted);
        this.internshipForm.get('supervisor').setValue(res.data.supervisor);
        this.internshipForm.get('startDate').setValue(res.data.startDate);
        this.internshipForm.get('endDate').setValue(res.data.endDate);

        this.companySelectForm.get('company').setValue(this.companies.find(c => c.id === res.data.company.id));

        this.submitting = false;
        this.cdr.markForCheck();
      })
    }
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
        async res => {
          await this.userService.fetchAuthenticatedUser();
          this.submitting = false;
          this.router.navigate(['/dashboard']);
        },
        err => {
          console.log('error');
          console.log(err);
          this.submitting = false;
          this.snackbar.open(
            err.error.exception.message,
            'Fechar',
            {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['snackbar-error']
            }
          );
          this.cdr.detectChanges();
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

  initializeForms() {
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

  onChangeCompany(event: any) {
    this.companyId = event.id;
  }

  updateCheckNewCompany(newCompany: boolean) {
    this.newCompany = newCompany;
    if(newCompany) {
      this.companySelectForm.markAsUntouched();
    }
  }

}
