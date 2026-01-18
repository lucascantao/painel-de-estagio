import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ModulesService } from 'src/app/shared/services/utils/modules.service';
import { UserService } from 'src/app/shared/services/utils/user.service';
import { InternshipDialogComponent } from './internship-dialog/internship-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconRegistry, MatIcon } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SkillsDialogComponent } from './skills-dialog/skills-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIcon
],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage {

  private readonly modulesService: ModulesService = inject(ModulesService);
  iconRegistry = inject(MatIconRegistry);
  sanitizer = inject(DomSanitizer);
  userService = inject(UserService);
  dialog = inject(MatDialog);
  user: any;

  isLoading: boolean = false;
  
  userSkills: any[] = [];
  isEditingSkills: boolean = false;

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
      this.userSkills = structuredClone(user.skills) || [];
      this.isLoading = false;
    });
  }

  getUserRole() {
    return this.userService.getRole();
  }

  openNewInternshipDialog() {
    const dialogRef = this.dialog.open(InternshipDialogComponent, {
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

  removeSkill(skill: any) {
    this.userSkills = this.userSkills.filter(s => s.id !== skill.id);
  }

  // saveSkills() {
  //   // Implement save skills logic here
  // }

  // resetSkills() {
  //   // Implement reset skills logic here
  // }

  // checkSkillsChanges() {
  //   console.log('user', this.user.skills);
  //   console.log('dashboard', this.userSkills);
  //   // console.log(this.user.skills?.some((skill: any) => !this.userSkills.some((userSkill: any) => userSkill.id === skill.id)));
  //   return 
  //     this.user.skills?.some((skill: any) => !this.userSkills.some((userSkill: any) => userSkill.id === skill.id))
  //     || this.userSkills.some((skill: any) => !this.user.skills.some((userSkill: any) => userSkill.id === skill.id));
  // }

}
