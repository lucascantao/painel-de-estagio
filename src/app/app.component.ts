import { CommonModule } from '@angular/common';
import { Component, computed, effect, EventEmitter, inject, signal, Signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

import { SidenavWidget } from "./core/layout/sidenav/sidenav.widget";
import { ModuleName } from './shared/domain/types/';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderWidget } from "./core/layout/header/header.widget";
import { ModulesService } from './shared/services/utils/modules.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    SidenavWidget,
    FlexLayoutModule,
    MatTooltipModule,
    HeaderWidget
],
  template: `
  <div id="app-layout-default">
    <app-sidenav *ngIf="moduleName() !== null && moduleName() !== 'auth'"></app-sidenav>
    <div class="content" role="main" fxFlex>
      <app-header></app-header>
      <router-outlet></router-outlet>
    </div>
  </div>
  `,
  styles: [
    `
      #layout-default {
        // background-color: #ccc;
        background-color: var(--app-light-color);

      }

      #app-layout-default {
        display: flex;
        flex-direction: row;
        position: relative;
        inset: 0;
      }

      .content {
        background-color: var(--app-light-color);
        overflow: hidden;
      }

    `,
  ],
})
export class AppComponent  {

  private readonly moduleService = inject(ModulesService);

  moduleName: WritableSignal<ModuleName> = signal<ModuleName>(null);
//   subscription: Subscription

  constructor() {
    effect(() => {
      this.moduleName.set(this.moduleService.moduleName());
    });
  }
}
