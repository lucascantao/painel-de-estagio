import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { InputFieldComponent } from "../../../../shared/ui/components/input-field/input-field.component";
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';
import { AuthService } from 'src/app/shared/services/utils/auth.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { UserService } from 'src/app/shared/services/utils/user.service';

@Component({
  selector: 'app-login-form',
  imports: [InputFieldComponent, ReactiveFormsModule, RouterLink, NgIf, MatProgressSpinner, NgClass],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  loginForm: FormGroup;
  formDataValid = true;
  isLoading = false;

  isRedirecting = false;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  async ngOnInit() {
    if(document.cookie.includes('XSRF-TOKEN')) {
      this.isRedirecting = true;
      await this.userService.fetchAuthenticatedUser()
      .then((user) => {
        this.isRedirecting = false;
        if(user) {
          const returnUrl = this.router.url.split('?returnUrl=%2F')[1];
          this.router.navigate([`/${returnUrl}`]);
        } else {
          this.router.navigate(['/autenticacao/login']);
        }
      }).catch(() => {
        this.isRedirecting = false;
        this.router.navigate(['/autenticacao/login']);
      });
    }
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
