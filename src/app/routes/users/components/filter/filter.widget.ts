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
import { ActionButtonComponent } from "src/app/shared/ui/components/action-button/action-button.component";
import { StorageRepositoryService } from 'src/app/shared/services/utils/storage.repository.service';

@Component({
  selector: 'app-filter-widget',
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinner,
    SelectFieldComponent,
    ReactiveFormsModule,
    ActionButtonComponent
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
  private readonly storageService = inject(StorageRepositoryService);

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

      const filters = this.storageService.load('userFilters', 'local', null);
      const selectedSkills = this.skills.filter(skill => filters?.skills?.includes(skill.id));
      const selectedCourses = this.courses.filter(course => filters?.courses?.includes(course.id));

      this.form.get('skills')?.setValue(selectedSkills);
      this.form.get('courses')?.setValue(selectedCourses);

      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  filter() {
    const skills = this.form.get('skills')?.value?.map((skill: any) => skill.id) || null;
    const courses = this.form.get('courses')?.value?.map((course: any) => course.id) || null;

    const filters = {
      skills,
      courses
    };

    this.storageService.save('userFilters', filters, 'local');

    this.dialogRef.close(true);
  }

  closePanel() {
    this.dialogRef.close(false);
  }

}
