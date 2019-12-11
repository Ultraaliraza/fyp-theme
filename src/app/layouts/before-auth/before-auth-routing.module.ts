import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/component/auth/login/login.component';
import { RegisterComponent } from 'src/app/component/auth/register/register.component';
import { ForgetpasswordComponent } from 'src/app/forgetpassword/forgetpassword.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },

      { path: 'register', component: RegisterComponent },
      { path: 'forgetpassword', component: ForgetpasswordComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeforeAuthRoutingModule { }
