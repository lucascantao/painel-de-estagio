import { CommonModule } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { DomSanitizer } from "@angular/platform-browser";
import { InternshipService } from "src/app/shared/services/utils/internship.service";
import { VacanceDetailsDialogComponent } from "../vacance-details-dialog/vacance-details-dialog.component";

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
  @Input() vacancyId: number;
  dialog = inject(MatDialog);

  iconRegistry: MatIconRegistry = inject(MatIconRegistry);
  sanitizer = inject(DomSanitizer);
  internshipService = inject(InternshipService);

  constructor() {
    this.iconRegistry.addSvgIcon('ellipsis', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/ellipsis-vertical-icon.svg'));
    this.iconRegistry.addSvgIcon('circle-check', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/circle-check-icon.svg'));
    this.iconRegistry.addSvgIcon('close', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/close-icon.svg'));
    this.iconRegistry.addSvgIcon('eye', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/eye-icon.svg'));
  }


  public openVacanceDialog() {
    const dialogRef = this.dialog.open(VacanceDetailsDialogComponent, {
      width: '700px',
      data: {
        vacancyId: this.vacancyId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  // public approveInternship() {
  //   this.internshipService.updateInternshipStatus(this.vacancyId, 4).then(() => {
  //     window.location.reload();
  //   });
  // }

  // public denyInternship() {
  //   this.internshipService.updateInternshipStatus(this.vacancyId, 2).then(() => {
  //     window.location.reload();
  //   });
  // }
}
