import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ModulesService } from 'src/app/shared/services/utils/modules.service';
import { UserService } from 'src/app/shared/services/utils/user.service';
import { InternshipDialogComponent } from './internship-dialog/internship-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule
],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage {

  private readonly modulesService: ModulesService = inject(ModulesService);
  userService = inject(UserService);
  dialog = inject(MatDialog);
  user: any;

  isLoading: boolean = false;

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

}
