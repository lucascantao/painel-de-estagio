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
  @Input() vacanceId: number;

  iconRegistry: MatIconRegistry = inject(MatIconRegistry);
  sanitizer = inject(DomSanitizer);

  constructor() {
    this.iconRegistry.addSvgIcon('ellipsis-vertical', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/ellipsis-vertical-icon.svg'));

  }

  actionDisabled(action: string) {
    let disabled: boolean = false;
    return disabled;
  }

  applyVacance() {
    
  }

  editVacance() {
    
  }
}
