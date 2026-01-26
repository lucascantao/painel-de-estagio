import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { UserService } from 'src/app/shared/services/utils/user.service';
import { InternshipService } from 'src/app/shared/services/utils/internship.service';
import { HeaderComponent } from "src/app/shared/ui/components/header-title/header.component";

@Component({
  selector: 'app-internship-details-dialog',
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinner,
    HeaderComponent
],
  templateUrl: './internship-details-dialog.component.html',
  styleUrls: ['./internship-details-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternshipDetailsDialogComponent implements OnInit {
  iconRegistry: MatIconRegistry = inject(MatIconRegistry);
  sanitizer = inject(DomSanitizer);

  constructor(
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ChangeDetectionStrategy>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.iconRegistry.addSvgIcon('close', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/close-icon.svg'));
  }

  userService = inject(UserService);
  internshipService = inject(InternshipService);
  internship: any;
  loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;
    this.internshipService.getInternshipById(this.data.internshipId).subscribe({
      next: (res) => {
        console.log(res);
        this.internship = res.data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    })
  }

  formatDate(date: string) {
    return new DatePipe('en-US').transform(new Date(date), 'dd/MM/yyyy');
  }

  closePanel() {
    this.dialogRef.close(false);
  }

}
