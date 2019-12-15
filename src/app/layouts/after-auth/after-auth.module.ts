import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AfterAuthRoutingModule } from './after-auth-routing.module';
import { HomeComponent } from 'src/app/home/home.component';
import { MarriageComponent } from 'src/app/marriage/marriage.component';
import { ProvertyComponent } from 'src/app/proverty/proverty.component';
import { EducationComponent } from 'src/app/education/education.component';
import { DonationsComponent } from 'src/app/donations/donations.component';
import { MotivatorComponent } from 'src/app/motivator/motivator.component';
import { DonorsComponent } from 'src/app/donors/donors.component';
import { QuestionComponent } from 'src/app/question/question.component';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { WomenComponent } from 'src/app/women/women.component';
import { ChildComponent } from 'src/app/child/child.component';
import { EmploymentComponent } from 'src/app/employment/employment.component';
import { OthersComponent } from 'src/app/others/others.component';
import { SetAccountTypeComponent } from 'src/app/component/auth/set-account-type/set-account-type.component';
import { UploadfilesService } from 'src/app/service/uploadfiles.service';
import { UserserviceService } from 'src/app/userservice.service';
import { SettingsComponent } from 'src/app/settings/settings.component';
import { UserprofileComponent } from 'src/app/userprofile/userprofile.component';
import { VideosComponent } from 'src/app/videos/videos.component';
import { EditComponent } from 'src/app/edit/edit.component';
import { MessagesComponent } from 'src/app/messages/messages.component';
import { AdminComponent } from 'src/app/admin/admin.component';
import { WatchvideoComponent } from 'src/app/watchvideo/watchvideo.component';
import { SidebarComponent } from 'src/app/admin/sidebar/sidebar.component';
import { UsersComponent } from 'src/app/admin/users/users.component';
import { BannusersComponent } from 'src/app/admin/bannusers/bannusers.component';
import { PostsComponent } from 'src/app/admin/posts/posts.component';
import { ReportsComponent } from 'src/app/admin/reports/reports.component';
import { AdminvideosComponent } from 'src/app/admin/adminvideos/adminvideos.component';
import { AdminDonationsComponent } from 'src/app/admin/donations/donations.component';
import { AdminDashboardComponent } from 'src/app/admin/admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    HomeComponent,
    MarriageComponent,
    ProvertyComponent,
    EducationComponent,
    DonationsComponent,
    MotivatorComponent,
    DonorsComponent,
    QuestionComponent,
    ProfileComponent,
    WomenComponent,
    ChildComponent,
    EmploymentComponent,
    OthersComponent,
    SetAccountTypeComponent,
    VideosComponent,
    SettingsComponent,
    UserprofileComponent,
    EditComponent,
    MessagesComponent,
    AdminComponent,
    WatchvideoComponent,
    SidebarComponent,
    UsersComponent,
    AdminDonationsComponent,
    BannusersComponent,
    PostsComponent,
    ReportsComponent,
    AdminvideosComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AfterAuthRoutingModule
  ],
  providers: [
    UserserviceService,
    UploadfilesService
  ]
})
export class AfterAuthModule { }
