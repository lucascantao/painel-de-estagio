import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { SkillsApiService } from 'src/app/shared/services/api/skills-api.service';
import { CourseApiService } from 'src/app/shared/services/api/course-api.service';
import { SelectFieldComponent } from "src/app/shared/ui/components/select-field/select-field.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-widget',
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinner,
    SelectFieldComponent,
    ReactiveFormsModule
],
  templateUrl: './filter.widget.html',
  styleUrls: ['./filter.widget.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterWidget implements OnInit {
  iconRegistry: MatIconRegistry = inject(MatIconRegistry);
  sanitizer = inject(DomSanitizer);

  loading: boolean = false;
  private readonly skillService = inject(SkillsApiService);
  private readonly courseService = inject(CourseApiService);

  form: FormGroup;
  skills: any[] = [];
  courses: any[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ChangeDetectionStrategy>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.iconRegistry.addSvgIcon('close', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/close-icon.svg'));

    this.form = new FormGroup({
      skills: new FormControl(null, []),
      courses: new FormControl(null, [])
    });
  }

  ngOnInit(): void {
    this.loading = true;
    const promises = Promise.all([
      this.skillService.skillsList(),
      this.courseService.courseList()
    ]);
    promises.then(([skills, courses]) => {
      this.skills = skills.data;
      this.courses = courses.data;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  filter() {

  }

  closePanel() {
    this.dialogRef.close(false);
  }

}
