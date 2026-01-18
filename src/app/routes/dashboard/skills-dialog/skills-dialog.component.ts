import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SkillsApiService } from 'src/app/shared/services/api/skills-api.service';
import { InputFieldComponent } from "src/app/shared/ui/components/input-field/input-field.component";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-skills-dialog',
  imports: [
    CommonModule,
    MatIconModule,
    InputFieldComponent,
    ReactiveFormsModule,
    MatProgressSpinner
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
  selectedSkills: any[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ChangeDetectionStrategy>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.iconRegistry.addSvgIcon('close', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/close-icon.svg'));
    this.iconRegistry.addSvgIcon('check', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/check-icon.svg'));
  }

  skillApiService = inject(SkillsApiService);
  skills: any[] = [];
  loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;
    this.skillApiService.skillsList().then(res => {
      this.skills = res.data;
      this.selectedSkills = structuredClone(this.data.userSkills) || [];
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  submit() {
    this.loading = true;
    const skillIds = this.selectedSkills.map(skill => skill.id);
    this.skillApiService.updateUserSkills(this.data.userId, skillIds).then((res) => {
      this.loading = false;
      this.dialogRef.close(this.selectedSkills);
    });
  }

  selectSkill(skill: any) {
    if(this.selectedSkills.some((s: any) => s.id === skill.id)) {
      this.selectedSkills = this.selectedSkills.filter((s: any) => s.id !== skill.id);
    } else {
      this.selectedSkills.push(skill);
    }
    this.cdr.detectChanges();
  }

  closePanel() {
    this.dialogRef.close(false);
  }

  onValueChange(value: string) {
    console.log(value);
  }

  highlightSkill(skillId: number) {
    return this.selectedSkills.some((skill: any) => skill.id === skillId);
  }

}
