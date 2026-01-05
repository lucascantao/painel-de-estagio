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

  constructor() {
    this.iconRegistry.addSvgIcon('plus', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/plus-icon.svg'));
  }

  ngOnInit() {
    this.modulesService.moduleName.set('dashboard');
    this.isLoading = true;
    this.userService.findUser(this.userService.getUserId()).then(user => {
      console.log(user);
      this.user = user;
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
      width: '256px'
    });
  }

}
