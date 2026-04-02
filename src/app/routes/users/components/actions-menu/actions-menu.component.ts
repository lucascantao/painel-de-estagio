import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { DomSanitizer } from "@angular/platform-browser";
import { InternshipService } from "src/app/shared/services/utils/internship.service";
// import { VacanceDetailsDialogComponent } from "../vacance-details-dialog/vacance-details-dialog.component";
import { UserService } from "src/app/shared/services/utils/user.service";
import { User } from "src/app/shared/domain/interfaces/User.interface";
import { Router } from "@angular/router";
import { VacanceService } from "src/app/shared/services/utils/vacance.service";

@Component({
  selector: 'app-actions-menu',
  templateUrl: './actions-menu.component.html',
  styleUrls: ['./actions-menu.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
})

export class ActionsMenuComponent {
  @Input() userId: number;
  @Output() updateData = new EventEmitter<void>();
  dialog = inject(MatDialog);

  iconRegistry: MatIconRegistry = inject(MatIconRegistry);
  sanitizer = inject(DomSanitizer);
  vacancyService = inject(VacanceService);
  readonly userService = inject(UserService);
  readonly router = inject(Router);

  constructor() {
    this.iconRegistry.addSvgIcon('ellipsis', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/ellipsis-vertical-icon.svg'));
    this.iconRegistry.addSvgIcon('pencil', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/pencil-icon.svg'));
    this.iconRegistry.addSvgIcon('trash', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/trash-icon.svg'));
    this.iconRegistry.addSvgIcon('eye', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/eye-icon.svg'));
  }


  public openVacanceDialog() {
    // const dialogRef = this.dialog.open(VacanceDetailsDialogComponent, {
    //   width: '700px',
    //   data: {
    //     vacancyId: this.vacancyId
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(result);
    // });
  }

  public edit() {
    this.router.navigate(['/vagas/editar', this.userId]);
  }

  public delete() {
    this.vacancyService.deleteVacance(this.userId).then(() => {
      this.updateData.emit();
    });
  }

  getUser(): User | null {
    return this.userService.getUser();
  }
}
