import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { HomeComponent } from './home/home.component';
import { pathMatch } from 'tough-cookie';
import { MotivatorComponent } from './motivator/motivator.component';
import { DonorsComponent } from './donors/donors.component';
import { MarriageComponent } from './marriage/marriage.component';
import { QuestionComponent } from './question/question.component';
import { EducationComponent } from './education/education.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ProfileComponent } from './profile/profile.component';

// import { CanActivate } from '@angular/router';
// import { ActivateGuard } from './activate.guard';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'contactus ',
    component: ContactusComponent
  },

  {
    path: 'profile/:key',
    component: ProfileComponent
  },
  {
    path: 'contact',
    component: ContactusComponent
  },
  {
    path: 'motivator',
    component: MotivatorComponent
  },
  {
    path: 'education',
    component: EducationComponent
  },

  {
    path: 'donor',
    component: DonorsComponent
  },

  {
    path: 'question/:key',
    component: QuestionComponent

  },
  {
    path: 'marriage',
    component: MarriageComponent

  },
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'register',
    component: RegisterComponent
  }, {
    path: 'forgetpassword',
    component: ForgetpasswordComponent
  },

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: '/LoginComponent',
    pathMatch: 'full'

  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
