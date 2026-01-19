import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ModulesService } from 'src/app/shared/services/utils/modules.service';
import { MatIconRegistry, MatIcon } from '@angular/material/icon';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterModule
],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage {

  private readonly modulesService: ModulesService = inject(ModulesService);

  ngOnInit() {
    this.modulesService.moduleName.set('dashboard');
  }

}
