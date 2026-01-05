import { Routes } from "@angular/router";

import { AuthenticationPage } from "./authentication.page";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { RecoveryEmailComponent } from "./components/recovery-email/recovery-email.component";
import { RecoveryPasswordComponent } from "./components/recovery-password/recovery-password.component";
import { RegisterFormComponent } from "./components/register-form/register-form.component";

export const routes: Routes = [
  {
    path: '',
    component: AuthenticationPage,
    children: [
      {
        path: 'login',
        component: LoginFormComponent
      },
      {
        path: 'registro',
        component: RegisterFormComponent
      },
      {
        path: 'recuperacao-email',
        component: RecoveryEmailComponent
      },
      {
        path: 'recuperacao-senha',
        component: RecoveryPasswordComponent
      }
    ]
  }
]
