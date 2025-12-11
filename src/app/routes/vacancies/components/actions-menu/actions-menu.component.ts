import { CommonModule } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { DomSanitizer } from "@angular/platform-browser";
import { RouterLinkWithHref } from "@angular/router";
import { MODULES } from "src/app/shared/domain/constants/modules.constant";
import { MappedModule } from "src/app/shared/domain/types";

@Component({
  selector: 'app-actions-menu',
  templateUrl: './actions-menu.component.html',
  styleUrls: ['./actions-menu.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterLinkWithHref
],
})

export class ActionsMenuComponent {
  @Input() vacanceId: number;

  iconRegistry: MatIconRegistry = inject(MatIconRegistry);
  sanitizer = inject(DomSanitizer);

  MODULES: MappedModule = MODULES;

  constructor() {
    // this.iconRegistry.addSvgIcon('ellipsis-vertical', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/ellipsis-vertical-icon.svg'));
    this.iconRegistry.addSvgIcon('down', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/arrow-down-icon.svg'));
    this.iconRegistry.addSvgIcon('pencil', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/pencil-icon.svg'));
    this.iconRegistry.addSvgIcon('trash', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/trash-icon.svg'));

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
