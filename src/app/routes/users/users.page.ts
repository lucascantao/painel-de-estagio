import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ModulesService } from 'src/app/shared/services/utils/modules.service';
import { RouterModule } from "@angular/router";
import { PageHeaderComponent } from "src/app/shared/ui/components/page-header/page-header.component";


@Component({
  selector: 'app-users',
  imports: [CommonModule, RouterModule, PageHeaderComponent],
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})

export class UsersPage {

  private readonly modulesService: ModulesService = inject(ModulesService);


  ngOnInit() {
    this.modulesService.moduleName.set('alunos');
  }

}
