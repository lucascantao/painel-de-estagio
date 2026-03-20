import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ModulesService } from 'src/app/shared/services/utils/modules.service';
import { UserService } from 'src/app/shared/services/utils/user.service';
import { InternshipFormPage } from '../internship-form/internship-form.page';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconRegistry, MatIcon } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SkillsDialogComponent } from '../skills-dialog/skills-dialog.component';
import { Router, RouterLinkWithHref } from "@angular/router";
import { MappedModule } from 'src/app/shared/domain/types';
import { MODULES } from 'src/app/shared/domain/constants/modules.constant';
import { Form, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InternshipService } from 'src/app/shared/services/utils/internship.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltip } from "@angular/material/tooltip";
// import { CourseDialogComponent } from '../course-dialog/course-dialog.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIcon,
    RouterLinkWithHref,
    ReactiveFormsModule,
    MatTooltip
],
  templateUrl: './user-page.page.html',
  styleUrls: ['./user-page.page.scss']
})
export class UserPage {
  private readonly snackbar = inject(MatSnackBar);
  private readonly modulesService: ModulesService = inject(ModulesService);
  public readonly cdr = inject(ChangeDetectorRef);
  iconRegistry = inject(MatIconRegistry);
  sanitizer = inject(DomSanitizer);
  userService = inject(UserService);
  internshipService = inject(InternshipService);
  dialog = inject(MatDialog);
  user: any;

  @ViewChild('fileInput') fileInput: any;

  isLoading: boolean = false;
  
  userSkills: any[] = [];
  isEditingSkills: boolean = false;

  MODULES: MappedModule = MODULES;

  constructor(
    private router: Router
  ) {  
    this.iconRegistry.addSvgIcon('plus', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/plus-icon.svg'));
    this.iconRegistry.addSvgIcon('alert', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/triangle-alert-icon.svg'));
    this.iconRegistry.addSvgIcon('pencil', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/pencil-icon.svg'));
    this.iconRegistry.addSvgIcon('upload', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/upload-icon.svg'));
    this.iconRegistry.addSvgIcon('re-send', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/re-send-icon.svg'));
    this.iconRegistry.addSvgIcon('circle-check', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/circle-check-icon.svg'));

    this.user = this.userService.getUser();
    this.userSkills = structuredClone(this.user.skills) || [];
  }

  ngOnInit() {
    this.modulesService.moduleName.set('dashboard');
  }

  getUserRole() {
    return this.userService.getRole();
  }

  openNewInternshipDialog() {
    const dialogRef = this.dialog.open(InternshipFormPage, {
      width: '650px'
    });
  }

  openSkillDialog() {
    const dialogRef = this.dialog.open(SkillsDialogComponent, {
      width: '256px',
      data: {
        userSkills: this.userSkills,
        userId: this.userService.getUserId()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(typeof result === 'object') {
        this.userSkills = structuredClone(result);
        console.log(this.userSkills);
      }
    });
  }

  formatDate(date: Date) {
    return new DatePipe('en-US').transform(new Date(date), 'dd/MM/yyyy');
  }
  removeSkill(skill: any) {
    this.userSkills = this.userSkills.filter(s => s.id !== skill.id);
  }

  onFileSelected(event: any) {
    console.log(event);
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length === 1) {
      console.log(input.files);
      const files: File[] = Array.from(input.files);
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('internshipId', this.user.internship.id.toString());
      this.internshipService.uploadDocument(formData).subscribe({
        next: res => {
          console.log('success', res);
          // this.router.navigate(['/dashboard']);
          window.location.reload();
          // this.userService.refreshUser();
          // this.cdr.detectChanges();
        },
        error: err => {
          console.log('error', err);
          this.snackbar.open(
            'Erro ao enviar o arquivo',
            'Fechar',
            {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['snackbar-error']
            }
          );
        }
      });
    }
  }

  public editInternship() {
    this.router.navigate(['dashboard/estagio-form/editar', this.user.internship.id]);
  }

}
