import { CommonModule } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { DomSanitizer } from "@angular/platform-browser";

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

  @Input() onUpdateStatus: (requestId: number, statusId: number) => void;
  @Input() onOpenDialog: (requestId: number, action: string, status: number) => void;
  @Input() requestId: number;
  @Input() status: number;

  iconRegistry: MatIconRegistry = inject(MatIconRegistry);
  sanitizer = inject(DomSanitizer);

  constructor() {
    this.iconRegistry.addSvgIcon('more-vertical', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/more_vertical-icon.svg'));

  }

  actionDisabled(statusId: number) {
    let disabled: boolean = false;
    if (statusId === 2 || statusId === 3) {
      disabled = this.status === 4 || this.status === statusId || this.status === 5;
    }
    if(statusId === 4) {
      disabled = this.status !== 2;
    }
    return disabled;
  }

  updateRequestStatus(statusId: number) {
    this.onUpdateStatus(this.requestId, statusId);
  }

  openViewDialog() {
    this.onOpenDialog(this.requestId, 'view', this.status);
  }

  openEditDialog() {
    this.onOpenDialog(this.requestId, 'edit', this.status);
  }
}
