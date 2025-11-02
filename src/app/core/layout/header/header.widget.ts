import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, computed, effect, inject, signal, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Title } from '@angular/platform-browser';
import { AvatarModule } from 'ngx-avatars';

import { MODULES } from 'src/app/shared/domain/constants/modules.constant';
import { Module, ModuleName } from 'src/app/shared/domain/types';
import { AuthService } from 'src/app/shared/services/utils/auth.service';
import { LoadingService } from 'src/app/shared/services/utils/loading.service';
import { ModulesService } from 'src/app/shared/services/utils/modules.service';
import { UserService } from 'src/app/shared/services/utils/user.service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    AvatarModule,
    MatIconModule,
  ],
  templateUrl: './header.widget.html',
  styleUrl: './header.widget.scss'
})
export class HeaderWidget {

  private readonly moduleService = inject(ModulesService);
  private readonly loadingService = inject(LoadingService);
  public readonly cdr = inject(ChangeDetectorRef);
  private readonly authService = inject(AuthService)
  private readonly userService = inject(UserService)
  private readonly title = inject(Title)

  appModule: Module;
  moduleName: Signal<ModuleName> = signal<ModuleName>(null);
  userName: Signal<string | null>;
  isLoading: boolean = false;

  constructor() {
    effect(() => {
      const mod = this.moduleService.moduleName()
      if (mod) {
        this.appModule = MODULES[mod];
        if (this.appModule) this.title.setTitle(this.appModule.browserTitle);
      }
    })
  }

  ngOnInit() {
    this.userService.refreshUser();
    this.userName = computed(() => {
      return this.userService.userName();
    });
    this.moduleName = computed(() => {
      return this.moduleService.moduleName();
    });
  }

  ngAfterViewInit(): void {
    this.loadingService.isLoading.subscribe(isLoading => {
      this.isLoading = isLoading
      this.cdr.detectChanges();
    })
  }

  logout() {
    this.authService.logout();
  }
}
