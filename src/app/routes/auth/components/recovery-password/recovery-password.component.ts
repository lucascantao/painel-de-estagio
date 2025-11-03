import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { InputFieldComponent } from '../../../../shared/ui/components/input-field/input-field.component';
import { NgIf } from '@angular/common';
import { AuthService } from 'src/app/shared/services/utils/auth.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [ InputFieldComponent, ReactiveFormsModule, NgIf, MatProgressSpinner ],
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.scss'
})
export class RecoveryPasswordComponent {

  private readonly authService = inject(AuthService)

  recoveryPasswordForm: FormGroup;

  password = '';
  passwordConfirm = '';
  passwordsMatch = true;

  isLoading = false

  constructor() {
  }

  ngOnInit() {
    this.recoveryPasswordForm = new FormGroup({
      token: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      passwordconfirm: new FormControl('', [Validators.required])
    })

    this.recoveryPasswordForm.valueChanges.subscribe(() => {
      const password = this.recoveryPasswordForm.get('password').value;
      const passwordConfirm = this.recoveryPasswordForm.get('passwordconfirm').value;
      this.passwordsMatch = password === passwordConfirm;
    });
  }

  async onSubmit() {
    this.isLoading = true
    if (this.recoveryPasswordForm.valid) {
      const formData = this.recoveryPasswordForm.value;
      await this.authService.resetPassword(formData.token, formData.password, formData.passwordconfirm)
        .catch(error => this.isLoading = false);
    } else {
      console.error('Form is invalid');
    }
    this.isLoading = false
  }
}
