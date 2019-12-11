import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { SetAccountTypeComponent } from 'src/app/component/auth/set-account-type/set-account-type.component';
import { MotivatorComponent } from 'src/app/motivator/motivator.component';
import { EducationComponent } from 'src/app/education/education.component';
import { DonorsComponent } from 'src/app/donors/donors.component';
import { MarriageComponent } from 'src/app/marriage/marriage.component';
import { ProvertyComponent } from 'src/app/proverty/proverty.component';
import { WomenComponent } from 'src/app/women/women.component';
import { ChildComponent } from 'src/app/child/child.component';
import { EmploymentComponent } from 'src/app/employment/employment.component';
import { OthersComponent } from 'src/app/others/others.component';
import { QuestionComponent } from 'src/app/question/question.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomeComponent },
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
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfterAuthRoutingModule { }
