import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Title } from '@angular/platform-browser';

import { MappedModule, Module, ModuleName } from 'src/app/shared/domain/types';
import { ModulesService } from 'src/app/shared/services/utils/modules.service';
import { MODULES } from 'src/app/shared/domain/constants/modules.constant';
import { LoadingService } from '../../../shared/services/utils/loading.service';
// import { ProjectInformationDialogComponent } from './dialogs/project-info-dialog.component';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/shared/services/utils/user.service';

@Component({
  selector: 'app-sidenav',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  templateUrl: './sidenav.widget.html',
  styleUrl: './sidenav.widget.scss'
})
export class SidenavWidget {

  private readonly title: Title = inject(Title)
  private readonly modulesService : ModulesService = inject(ModulesService)
  public readonly loadingService: LoadingService = inject(LoadingService)
  public readonly userService = inject(UserService)
  public readonly cdr = inject(ChangeDetectorRef)
  private readonly dialog: MatDialog = inject(MatDialog)

  appModule: Module;
  isLoading: boolean = false;

  MODULES: MappedModule = MODULES

  constructor() {
    effect(() => {
      const mod = this.modulesService.moduleName()
      if (mod) {
        this.appModule = MODULES[mod];
        if (this.appModule) this.title.setTitle(this.appModule.browserTitle);
      }
    })
  }

  ngAfterViewInit(): void {
    // Não precisa
    // this.loadingService.isLoading.subscribe(isLoading => {
    //   this.isLoading = isLoading;
    //   this.cdr.detectChanges();
    // })
  }

  isActiveModule(moduleName: ModuleName): boolean {
    return this.modulesService.moduleName() === moduleName
  }

//   projectInformationDialog() {
//       this.dialog.open(ProjectInformationDialogComponent, {width: '50%', autoFocus: false});
//   }

  onModuleClick(moduleName: ModuleName) {
    this.modulesService.changeCurrentModule(moduleName);
  }
}
