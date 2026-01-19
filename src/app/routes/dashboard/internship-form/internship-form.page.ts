import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { InputFieldComponent } from "src/app/shared/ui/components/input-field/input-field.component";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { HeaderComponent } from "src/app/shared/ui/components/header-title/header.component";
import { Router } from '@angular/router';
import { DateSelectFieldComponent } from "src/app/shared/ui/components/datepicker/date-select-field.component";
import { CompanyApiService } from 'src/app/shared/services/api/company-api.service';
import { SelectFieldComponent } from "src/app/shared/ui/components/select-field/select-field.component";

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
    SelectFieldComponent
],
  templateUrl: './internship-form.page.html',
  styleUrls: ['./internship-form.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternshipFormPage {
  iconRegistry: MatIconRegistry = inject(MatIconRegistry);
  sanitizer = inject(DomSanitizer);
  companyApiService: CompanyApiService = inject(CompanyApiService);

  form: FormGroup;
  company: FormGroup;
  companies: any[] = [];
  companyId: number | null = null;

  submitting: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    // this.iconRegistry.addSvgIcon('exclamation', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/exclamation-icon.svg'));
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      workload: new FormControl(),
      schedule: new FormControl(),
      salary: new FormControl(),
      supervisor: new FormControl(),
      startDate:  new FormControl(),
      endDate:  new FormControl(),
      // companyId:  new FormControl(),
      // userId: new FormControl(),
      // observation:  new FormControl(),
    });

    this.companyApiService.companyList().then(companies => {
      
      this.companies = companies.data;
      this.cdr.markForCheck();
    });

    this.company = new FormGroup({
      name: new FormControl(),
      address: new FormControl(),
      cnpj: new FormControl(),
      email: new FormControl(),
      phone: new FormControl()
    });
  }

  submit() {

  }

  onChangeCompany(event: any) {
    this.companyId = event.value;
  }

}
