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
import { AboutComponent } from './about/about.component';
import { ProvertyComponent } from './proverty/proverty.component';
import { WomenComponent } from './women/women.component';

// import { ProvertyComponent } from './proverty/proverty.component';
import { from } from 'rxjs';

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
    path: 'about ',
    component: AboutComponent
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
  }, {
    path: 'about',
    component: AboutComponent
  }, {
    path: 'donors',
    component: DonorsComponent
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'proverty',
    component: ProvertyComponent
  }, {

    path: 'women',
    component: WomenComponent
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
