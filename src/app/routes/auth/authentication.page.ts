import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModulesService } from 'src/app/shared/services/utils/modules.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, RouterOutlet ],
  templateUrl: './authentication.page.html',
  styleUrl: './authentication.page.scss'
})
export class AuthenticationPage {

  private readonly modulesService: ModulesService = inject(ModulesService)

  ngOnInit() {
    this.modulesService.moduleName.set('auth');
  }
}
