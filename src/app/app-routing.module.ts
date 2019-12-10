import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { HomeComponent } from './home/home.component';

import { MotivatorComponent } from './motivator/motivator.component';
import { DonorsComponent } from './donors/donors.component';
import { MarriageComponent } from './marriage/marriage.component';
import { QuestionComponent } from './question/question.component';
import { EducationComponent } from './education/education.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { ProvertyComponent } from './proverty/proverty.component';
import { WomenComponent } from './women/women.component';
import { ChildComponent } from './child/child.component';
import { EmploymentComponent } from './employment/employment.component';
import { OthersComponent } from './others/others.component';

import { SetAccountTypeComponent } from './component/auth/set-account-type/set-account-type.component';

import { AfterAuthGuard } from './service/auth-guard/after-auth.guard';
import { BeforeAuthGuard } from './service/auth-guard/before-auth.guard';
const routes: Routes = [

  { path: 'contactus ', component: ContactusComponent },
  { path: 'about ', component: AboutComponent },

  {
    path: '',
    children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgetpassword', component: ForgetpasswordComponent },
      { path: 'register', component: RegisterComponent },

      { path: '**', redirectTo: '/login', pathMatch: 'full' }
    ],
    canActivate: [BeforeAuthGuard]
  },
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'profile/:key', component: ProfileComponent },
      { path: 'set-account-type', component: SetAccountTypeComponent },
      { path: 'motivator', component: MotivatorComponent },
      { path: 'education', component: EducationComponent },
      { path: 'donors', component: DonorsComponent },
      { path: 'marriage', component: MarriageComponent },
      { path: 'proverty', component: ProvertyComponent },
      { path: 'women', component: WomenComponent },
      { path: 'child', component: ChildComponent },
      { path: 'employment', component: EmploymentComponent },
      { path: 'others', component: OthersComponent },
      { path: 'question/:key', component: QuestionComponent },

      { path: '**', redirectTo: '/home', pathMatch: 'full' }
    ],
    canActivate: [AfterAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
