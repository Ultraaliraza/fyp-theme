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
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,


  ],
  providers: [ActivateGuard, UserserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
