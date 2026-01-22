import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ModulesService } from 'src/app/shared/services/utils/modules.service';
import { UserService } from 'src/app/shared/services/utils/user.service';
import { InternshipFormPage } from '../internship-form/internship-form.page';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconRegistry, MatIcon } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SkillsDialogComponent } from '../skills-dialog/skills-dialog.component';
import { RouterLinkWithHref } from "@angular/router";
import { MappedModule } from 'src/app/shared/domain/types';
import { MODULES } from 'src/app/shared/domain/constants/modules.constant';
// import { CourseDialogComponent } from '../course-dialog/course-dialog.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIcon,
    RouterLinkWithHref
],
  templateUrl: './user-page.page.html',
  styleUrls: ['./user-page.page.scss']
})
export class UserPage {

  private readonly modulesService: ModulesService = inject(ModulesService);
  iconRegistry = inject(MatIconRegistry);
  sanitizer = inject(DomSanitizer);
  userService = inject(UserService);
  dialog = inject(MatDialog);
  user: any;

  isLoading: boolean = false;
  
  userSkills: any[] = [];
  isEditingSkills: boolean = false;

  MODULES: MappedModule = MODULES;

  constructor() {
    this.iconRegistry.addSvgIcon('plus', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/plus-icon.svg'));
    this.iconRegistry.addSvgIcon('trash', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/trash-icon.svg'));
    this.iconRegistry.addSvgIcon('close', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/close-icon.svg'));
    this.iconRegistry.addSvgIcon('save', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/save-icon.svg'));
    this.iconRegistry.addSvgIcon('pencil', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/pencil-icon.svg'));
  }

  ngOnInit() {
    this.modulesService.moduleName.set('dashboard');
    this.isLoading = true;
    this.userService.findUser(this.userService.getUserId()).then(user => {
      this.user = user;
      console.log(user);
      this.userSkills = structuredClone(user.skills) || [];
      this.isLoading = false;
    });
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

  // openCourseDialog() {
  //   const dialogRef = this.dialog.open(CourseDialogComponent, {
  //     width: '400px',
  //     // data: {
  //     //   userSkills: this.userSkills,
  //     //   userId: this.userService.getUserId()
  //     // }
  //   });

  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   if(typeof result === 'object') {
  //   //     this.userSkills = structuredClone(result);
  //   //     console.log(this.userSkills);
  //   //   }
  //   // });
  // }

  removeSkill(skill: any) {
    this.userSkills = this.userSkills.filter(s => s.id !== skill.id);
  }

}
