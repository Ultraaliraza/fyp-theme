import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { SetAccountTypeComponent } from 'src/app/component/auth/set-account-type/set-account-type.component';
import { EducationComponent } from 'src/app/education/education.component';
import { MarriageComponent } from 'src/app/marriage/marriage.component';
import { ProvertyComponent } from 'src/app/proverty/proverty.component';
import { WomenComponent } from 'src/app/women/women.component';
import { ChildComponent } from 'src/app/child/child.component';
import { EmploymentComponent } from 'src/app/employment/employment.component';
import { OthersComponent } from 'src/app/others/others.component';
import { QuestionComponent } from 'src/app/question/question.component';
import { SettingsComponent } from 'src/app/settings/settings.component';
import { UserprofileComponent } from 'src/app/userprofile/userprofile.component';
import { VideosComponent } from 'src/app/videos/videos.component';
import { EditComponent } from 'src/app/edit/edit.component';
import { MessagesComponent } from 'src/app/messages/messages.component';
import { WatchvideoComponent } from 'src/app/watchvideo/watchvideo.component';
import { AdminComponent } from 'src/app/admin/admin.component';
import { AdminvideosComponent } from 'src/app/admin/adminvideos/adminvideos.component';
import { AdminDonationsComponent } from 'src/app/admin/donations/donations.component';
import { BannusersComponent } from 'src/app/admin/bannusers/bannusers.component';
import { PostsComponent } from 'src/app/admin/posts/posts.component';
import { ReportsComponent } from 'src/app/admin/reports/reports.component';
import { AdminDashboardComponent } from 'src/app/admin/admin-dashboard/admin-dashboard.component';
import { IdentifierGuard } from 'src/app/service/auth-guard/identifier.guard';
import { CouncillorGuard } from 'src/app/service/auth-guard/councillor.guard';
import { DonorsGuard } from 'src/app/service/auth-guard/donors.guard';
import { RedirectGuardService } from 'src/app/service/auth-guard/redirect-guard.guard';
import { HomeComponent } from 'src/app/home/home.component';
import { MotivatorComponent } from 'src/app/motivator/motivator.component';
import { DonorsComponent } from 'src/app/donors/donors.component';
import { AdminGuard } from 'src/app/service/auth-guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [

      { path: 'profile/:key', component: ProfileComponent },
      { path: 'watchvideo/:key', component: WatchvideoComponent },
      {
        path: 'admin', component: AdminComponent, children: [
          { path: '', component: AdminDashboardComponent },
          { path: 'adminvideos', component: AdminvideosComponent },
          { path: 'donations', component: AdminDonationsComponent },
          { path: 'bannUsers', component: BannusersComponent },
          { path: 'posts', component: PostsComponent },
          { path: 'Reports', component: ReportsComponent },
        ], canActivate:[AdminGuard]
      },
      { path: 'set-account-type', component: SetAccountTypeComponent },
      { path: 'education', component: EducationComponent },
      { path: 'marriage', component: MarriageComponent },
      { path: 'proverty', component: ProvertyComponent },
      { path: 'women', component: WomenComponent },
      { path: 'child', component: ChildComponent },
      { path: 'employment', component: EmploymentComponent },
      { path: 'others', component: OthersComponent },
      { path: 'question/:key', component: QuestionComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'uprofile', component: UserprofileComponent },
      { path: 'videos', component: VideosComponent },
      { path: 'edit', component: EditComponent },
      { path: 'messages', component: MessagesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfterAuthRoutingModule { }
