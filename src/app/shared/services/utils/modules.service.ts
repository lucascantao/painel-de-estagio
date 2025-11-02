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

//   private readonly alertMetadataService: AlertMetadataService = inject(AlertMetadataService);
//   private readonly mapControlsService: MapControlsService = inject(MapControlsService);
//   private readonly mapLayersService: MapLayersService = inject(MapLayersService);
  private readonly router: Router = inject(Router);

  moduleName: WritableSignal<ModuleName> = signal<ModuleName>(null);
  sideNavToggle = signal<boolean>(false);
//   selectedAlert: Alert;

  constructor() {
    // effect(() => {
    //   this.selectedAlert = this.alertMetadataService.selectedAlert();
    // })
  }

  // TODO: REVISAR ISSO AQUI
  changeCurrentModule(moduleName: ModuleName, isAlertsModule: boolean) {
        this.router.navigate([MODULES[moduleName].route]);
    /* If the current module is upload or dashboard, there is no need to reset the layers */
    // if (!isAlertsModule) {
    //   this.router.navigate([MODULES[moduleName].route]);
    // } else if (moduleName in MODULES) {
    //   /* Deselect the current validation control */
    //   this.mapControlsService.activatedControlChange(null);
    //   ///////////////////////////////////////////////////////////////////////////////////////////this.mapLayersService.resetLayers();
    //   /* If there is an alert selected, redirect to it on the other module */
    //   if (isAlertsModule && this.selectedAlert) {
    //     this.router.navigate([MODULES[moduleName].route, this.selectedAlert.alertId]);
    //   }
    //   else {
    //     /* Deselect the current validation control */
    //     this.router.navigate([MODULES[moduleName].route]);
    //   }
    // }
  }

  getSideNavToggle(){
    const sideNavToggle = this.sideNavToggle();
    this.sideNavToggle.set(false)
    return sideNavToggle
  }
}
