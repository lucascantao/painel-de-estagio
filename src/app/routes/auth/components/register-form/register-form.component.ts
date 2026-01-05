import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { InputFieldComponent } from "../../../../shared/ui/components/input-field/input-field.component";
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from 'src/app/shared/services/utils/auth.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SelectFieldComponent } from "src/app/shared/ui/components/select-field/select-field.component";
import { DateSelectFieldComponent } from "src/app/shared/ui/components/datepicker/date-select-field.component";

@Component({
  selector: 'app-register-form',
  imports: [InputFieldComponent, ReactiveFormsModule, RouterLink, NgIf, MatProgressSpinner, SelectFieldComponent, DateSelectFieldComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  private readonly authService = inject(AuthService);

  registerForm: FormGroup;
  formDataValid = true;
  isLoading = false;

  gender = [
    { id: 'masculino', name: 'Masculino' },
    { id: 'feminino', name: 'Feminino' },
    { id: 'outro', name: 'Outro' }
  ]

  constructor() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
    })
  }

  async onSubmit() {
    this.isLoading = true;
    if (this.registerForm.valid) {
      this.formDataValid = true;
      const userPayload = {
        ...structuredClone(this.registerForm.value),
        gender: this.registerForm.get('gender').value.id
      }
      console.log(userPayload);
      await this.authService.register(userPayload);
    } else {
      this.registerForm.markAllAsTouched();
      this.formDataValid = false;
    }
    this.isLoading = false;
  }
}
