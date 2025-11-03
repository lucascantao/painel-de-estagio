import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { InputFieldComponent } from "../../../../shared/ui/components/input-field/input-field.component";
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from 'src/app/shared/services/utils/auth.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login-form',
  imports: [ InputFieldComponent, ReactiveFormsModule, RouterLink, NgIf, MatProgressSpinner ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  private readonly authService = inject(AuthService);

  loginForm: FormGroup;
  formDataValid = true;
  isLoading = false;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  async onSubmit() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      this.formDataValid = true;
      const formData = this.loginForm.value;
      await this.authService.login(formData.email, formData.password);
    } else {
      this.formDataValid = false;
    }
    this.isLoading = false;
  }
}
