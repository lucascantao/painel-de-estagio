import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HeaderComponent } from "src/app/shared/ui/components/header-title/header.component";
import { InputFieldComponent } from "src/app/shared/ui/components/input-field/input-field.component";
import { DateSelectFieldComponent } from "src/app/shared/ui/components/datepicker/date-select-field.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionButtonComponent } from "src/app/shared/ui/components/action-button/action-button.component";
import { MappedModule } from 'src/app/shared/domain/types';
import { MODULES } from 'src/app/shared/domain/constants/modules.constant';
import { Router, RouterLinkWithHref } from "@angular/router";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { CourseApiService } from 'src/app/shared/services/api/course-api.service';
import { UserService } from 'src/app/shared/services/utils/user.service';
import { SelectFieldComponent } from "src/app/shared/ui/components/select-field/select-field.component";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-course-form',
  imports: [CommonModule, HeaderComponent, InputFieldComponent, ReactiveFormsModule, ActionButtonComponent, RouterLinkWithHref, MatProgressSpinner, SelectFieldComponent],
  templateUrl: './course-form.page.html',
  styleUrls: ['./course-form.page.scss'],
})

export class CourseFormPage {
  MODULES: MappedModule = MODULES
  private readonly snackbar = inject(MatSnackBar);
  private readonly courseService: CourseApiService = inject(CourseApiService);
  userService: UserService = inject(UserService);
  form: FormGroup;
  
  submitting: boolean = false;

  courses: any = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { 
    this.form = new FormGroup({
      course: new FormControl(null, [Validators.required]),
      studentNumber: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.courseService.courseList().then(courses => {
      this.courses = courses.data;
    });
  }

  submit() {
    this.submitting = true;
    if(this.form.valid) {
      const payload = {
        ...structuredClone(this.form.value),
        courseId: this.form.get('course').value.id
      };
      const userId = this.userService.getUserId();
      this.courseService.updateUserCourse(userId, payload).then(
        async res => {
          await this.userService.fetchAuthenticatedUser();
          this.submitting = false;
          this.router.navigate(['/dashboard']);
        },
        err => {
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
        }
      );
    } else {
      this.form.markAllAsTouched();
      this.submitting = false;
      this.cdr.detectChanges();
    }
  }

}
