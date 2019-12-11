import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ActivateGuard } from './activate.guard';
import { UserserviceService } from './userservice.service';
import { MarriageComponent } from './marriage/marriage.component';
import { ProvertyComponent } from './proverty/proverty.component';
import { EducationComponent } from './education/education.component';
import { ContactusComponent } from './contactus/contactus.component';
import { DonationsComponent } from './donations/donations.component';
import { MotivatorComponent } from './motivator/motivator.component';
import { DonorsComponent } from './donors/donors.component';
import { QuestionComponent } from './question/question.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { WomenComponent } from './women/women.component';
import { UploadfilesService } from './service/uploadfiles.service';
import { ChildComponent } from './child/child.component';
import { EmploymentComponent } from './employment/employment.component';
import { OthersComponent } from './others/others.component';
import { VideosComponent } from './videos/videos.component';
import { SettingsComponent } from './settings/settings.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AdminComponent } from './admin/admin.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgetpasswordComponent,
    HomeComponent,
    MarriageComponent,
     ProvertyComponent,
    EducationComponent,
    ContactusComponent,
    DonationsComponent,
    MotivatorComponent,
    DonorsComponent,
    QuestionComponent,
    ProfileComponent,
    AboutComponent,
    WomenComponent,
    ChildComponent,
    EmploymentComponent,
    OthersComponent,
    VideosComponent,
    SettingsComponent,
    UserprofileComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,


  ],
  providers: [ActivateGuard, UserserviceService, UploadfilesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
