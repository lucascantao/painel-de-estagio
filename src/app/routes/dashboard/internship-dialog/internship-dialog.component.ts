import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { InputFieldComponent } from "src/app/shared/ui/components/input-field/input-field.component";

@Component({
  selector: 'app-internship-dialog',
  imports: [
    CommonModule,
    MatIconModule,
    InputFieldComponent,
    ReactiveFormsModule,
],
  templateUrl: './internship-dialog.component.html',
  styleUrls: ['./internship-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternshipDialogComponent implements OnInit {
  iconRegistry: MatIconRegistry = inject(MatIconRegistry);
  sanitizer = inject(DomSanitizer);

  form: FormGroup;
  company: FormGroup;

  constructor(
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ChangeDetectionStrategy>,
  ) {
    this.iconRegistry.addSvgIcon('close', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/close-icon.svg'));
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
      companyId:  new FormControl(),
      userId: new FormControl(),
      observation:  new FormControl(),
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

  closePanel() {
    this.dialogRef.close(false);
  }

}
