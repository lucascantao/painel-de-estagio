import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

import { MODULES } from '../../domain/constants/modules.constant';
// import { Alert } from '../../domain/interfaces/Alert.interface';
import { ModuleName } from '../../domain/types';
// import { AlertMetadataService } from './alert-visualization-metadata.service';
// import { MapControlsService } from './map-controls.service';
// import { MapLayersService } from './map-layers.service';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  private readonly router: Router = inject(Router);

  moduleName: WritableSignal<ModuleName> = signal<ModuleName>(null);
  sideNavToggle = signal<boolean>(false);

  constructor() {
  }

  // TODO: REVISAR ISSO AQUI
  changeCurrentModule(moduleName: ModuleName) {
        this.router.navigate([MODULES[moduleName].route]);
  }

  getSideNavToggle(){
    const sideNavToggle = this.sideNavToggle();
    this.sideNavToggle.set(false)
    return sideNavToggle
  }
}
