import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SkillsApiService } from 'src/app/shared/services/api/skills-api.service';
import { InputFieldComponent } from "src/app/shared/ui/components/input-field/input-field.component";

@Component({
  selector: 'app-skills-dialog',
  imports: [
    CommonModule,
    MatIconModule,
    InputFieldComponent,
    ReactiveFormsModule,
],
  templateUrl: './skills-dialog.component.html',
  styleUrls: ['./skills-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsDialogComponent implements OnInit {
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

  skillApiService = inject(SkillsApiService);
  skills: any[] = [];

  ngOnInit(): void {
    this.skillApiService.skillsList().then(res => {
      console.log(res);
      this.skills = res.data;
      this.cdr.detectChanges();
    });
  }

  submit() {

  }

  selectSkill(skill: any) {
    console.log(skill);
  }

  closePanel() {
    this.dialogRef.close(false);
  }

  onValueChange(value: string) {
    console.log(value);
  }

}
