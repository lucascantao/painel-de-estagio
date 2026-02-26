import { CommonModule } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { DomSanitizer } from "@angular/platform-browser";
import { InternshipDetailsDialogComponent } from "../internship-details-dialog/internship-details-dialog.component";
import { InternshipService } from "src/app/shared/services/utils/internship.service";
import { Internship } from "src/app/shared/domain/interfaces/Internship.interface";

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
})

export class PageHeaderComponent {

  iconRegistry: MatIconRegistry = inject(MatIconRegistry);
  sanitizer = inject(DomSanitizer);

  constructor() {
    this.iconRegistry.addSvgIcon('ellipsis', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/ellipsis-vertical-icon.svg'));
    this.iconRegistry.addSvgIcon('circle-check', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/circle-check-icon.svg'));
    this.iconRegistry.addSvgIcon('close', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/close-icon.svg'));
    this.iconRegistry.addSvgIcon('eye', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/eye-icon.svg'));
  }

  ngOnInit() {
  }
}
