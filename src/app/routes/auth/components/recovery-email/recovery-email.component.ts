import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { InputFieldComponent } from '../../../../shared/ui/components/input-field/input-field.component';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from 'src/app/shared/services/utils/auth.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-recovery-email',
  imports: [ CommonModule, InputFieldComponent, ReactiveFormsModule, MatIconModule, MatProgressSpinner, RouterLink ],
  templateUrl: './recovery-email.component.html',
  styleUrl: './recovery-email.component.scss'
})
export class RecoveryEmailComponent {

  private readonly authService = inject(AuthService)

  recoveryEmailForm: FormGroup;
  formDataValid = true;
  isLoading = false

  constructor() {
    this.recoveryEmailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  async onSubmit(event: Event) {
    this.isLoading = true
    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();
    if (this.recoveryEmailForm.valid) {
      await this.authService.forgotPassword(this.recoveryEmailForm.value.email).catch((error: any) => {
        this.isLoading = false
      })
      this.formDataValid = true;
      return;
    }
    else{
      this.formDataValid = false;
    }
    this.isLoading = false
  }
}
