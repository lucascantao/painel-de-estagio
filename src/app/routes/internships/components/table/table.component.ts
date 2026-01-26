
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { Component, inject, Input, input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { Page } from 'src/app/shared/domain/interfaces/Page.interface';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { FilterModalComponent } from '../filter-modal/filter-modal.component';
import { UserService } from 'src/app/shared/services/utils/user.service';
import { CustomPaginatorIntl } from 'src/app/shared/features/custom-paginator-intl/custom-paginator';
import { ActionsMenuComponent } from '../actions-menu/actions-menu.component';
import { Internship } from 'src/app/shared/domain/interfaces/Internship.interface';
import { InternshipService } from 'src/app/shared/services/utils/internship.service';
// import { ModulesService } from 'src/app/shared/services/utils/modules.service';

@Component({
  selector: 'app-internships-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    NgIf,
    MatCheckboxModule,
    ActionsMenuComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],

})

export class InternshipsTableComponent {
  private readonly internshipService: InternshipService = inject(InternshipService);
  iconRegistry: MatIconRegistry = inject(MatIconRegistry);
  sanitizer = inject(DomSanitizer);
  dialog = inject(MatDialog);
  userService = inject(UserService);

  private pageRequest$ = new Subject<{
    page: number,
    perPage: number,
    search: string,
    sortColumn: string | null,
    direction: 'asc' | 'desc' | null,
    filters: any
  }>();

  internshipsPage: Page<Internship>;
  internships: Internship[] = [];
  displayedColumns: string[] = [
    // 'select',
    'studentId',
    'status',
    'name',
    'course',
    // 'email',
    'company',
    // 'supervisor',
    'schedule',
    'workload',
    'salary',
    'startDate',
    'endDate',
    // 'observation',
    'actions'
  ];
  dataSource: MatTableDataSource<Internship> = new MatTableDataSource([]);
  sortheader = true;
  currentPage: number = 1;
  perPage = 15;
  total: number = 0;
  searchText: string = '';
  isLoading: boolean = false;
  sortColumn: string | null = null;
  direction: 'asc' | 'desc' | null = null;
  checkedItems: number[] = [];
  filters: any = {
    partner: null,
    observation: null,
    state: null,
    city: null,
    territoryType: null,
    dateStart: null,
    dateEnd: null
  };

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() statuses: {value: number, name: string}[] = [
    {value: null, name: 'Todas'},
    {value: 1, name: 'Em Análise'},
    {value: 2, name: 'Aprovada'},
    {value: 3, name: 'Negada'},
    {value: 4, name: 'Priorizada'},
    {value: 5, name: 'Finalizada'},
  ];
  selectedStatus: {value: number, name: string} = this.statuses[0];

  constructor() {
    // this.iconRegistry.addSvgIcon('more-vertical', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/more_vertical-icon.svg'));
    // this.iconRegistry.addSvgIcon('search', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/search-icon.svg'));
    // this.iconRegistry.addSvgIcon('filter', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/filter-icon.svg'));
    // this.iconRegistry.addSvgIcon('add', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/add-icon.svg'));
    // this.iconRegistry.addSvgIcon('create-request', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/logistics/create-request-icon.svg'));
    // this.iconRegistry.addSvgIcon('exclamation', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/exclamation-icon.svg'));
    // this.iconRegistry.addSvgIcon('close', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/close-icon.svg'));
  }

  ngOnInit() {
    this.pageRequest$.pipe(
      debounceTime(300),
      switchMap(({ page, perPage, search, sortColumn, direction, filters}) => {
        this.isLoading = true;
        return this.internshipService.getAllInternships(page, perPage, search, sortColumn, direction, filters, this.userService.getUserId());
      })
    ).subscribe({
      next: (response) => {
        this.internshipsPage = response.data;
        this.total = response.data.total;
        this.internships = response.data.items;
        this.dataSource.data = this.internships
        .map(internship => ({
          ...internship, 
          status: {
            id: internship.status.id,
            name: internship.status.name.toUpperCase()
          },
          startDate: internship.startDate ? new Date(internship.startDate).toLocaleDateString('pt-BR') : null,
          endDate: internship.endDate ? new Date(internship.endDate).toLocaleDateString('pt-BR') : null
        }));

        // post-load
        this.isLoading = false;
        this.checkedItems = [];
      },
      error: () => {
        this.isLoading = false;
      }
    });

    this.updateData();

    this.dataSource.sort = this.sort;
  }

  async updateData(search: string = null) {
    this.pageRequest$.next({
      page: this.currentPage,
      perPage: this.perPage,
      search: this.searchText,
      sortColumn: this.sortColumn,
      direction: this.direction,
      filters: this.getFilterIds()
    });
  }

  ngOnDestroy() {
    this.pageRequest$.complete();
  }

  handleSortChange(sort: Sort) {
    if (sort.direction === '') {
      this.sortColumn = null;
      this.direction = null;
    } else {
      this.sortColumn = sort.active;
      this.direction = sort.direction as 'asc' | 'desc';
    }

    if (this.paginator) {
        this.paginator.pageIndex = 0;
    }
    this.currentPage = 1;

    this.updateData(this.searchText);
  }

  openFilterDialog() {
    // const dialogRef = this.dialog.open(FilterModalComponent, {
    //   width: '568px',
    //   data: {
    //     filters: this.filters,
    //   }
    // });

    // dialogRef.afterClosed().subscribe(filter => {
    //   if(filter)
    //     this.applyFilter(filter);
    // });
  }

  applyFilter(filters: any) {
    this.filters = filters;
    this.updateData();
    this.currentPage = 1;
  }

  clearFilter() {
    if(this.isFilterEmpty() && !this.searchText) return;
    this.currentPage = 1;
    this.searchText = '';
    this.filters = {
      partner: null,
      observation: null,
      state: null,
      city: null,
      territoryType: null,
      dateStart: null,
      dateEnd: null
    };
    this.updateData();
  }

  searchTextFilter() {
    this.currentPage = 1;
    this.updateData();
  }

  isFilterEmpty(): boolean {
    const f_arr = Object.values(this.filters);
    return f_arr.every(filter => filter === null);
  }

  async onPageChange(event: PageEvent) {
    this.currentPage = this.currentPage !== event.pageIndex + 1 ? event.pageIndex + 1 : this.currentPage;
    this.perPage = event.pageSize;
    this.searchText = this.searchText != '' ? this.searchText : null;
    await this.updateData(this.searchText);
  }

  onCheckItem(id: number) {

    if (this.isChecked(id)) {
      this.checkedItems = this.checkedItems.filter(item => item !== id);
    } else {
      this.checkedItems.push(id);
    }
  }

  isChecked(id: number): boolean {
    return this.checkedItems.includes(id);
  }

  onCheckAll() {
    this.isAllSelected() ? this.checkedItems = [] : this.checkedItems = this.internships.map(request => request.id);
  }

  isAllSelected() {
    return this.checkedItems.length === this.internships.length && this.checkedItems.length > 0;
  }

  getFilterIds() {
    // Convertendo pro formato da api
    // const api_format = {
    //   partners_id: this.filters.partner?.id,
    //   observation: this.filters.observation?.id,
    //   state_id: this.filters.state?.id,
    //   city_id: this.filters.city?.id,
    //   territories_id: this.filters.territoryType?.id,
    //   territory_name: this.filters.territoryName?.name,
    //   start_date: this.filters.dateStart,
    //   end_date: this.filters.dateEnd
    // }

    // for (const key in api_format) {
    //   if(!api_format[key]) {
    //     delete api_format[key];
    //   }
    // }

    // return api_format
  }

}
