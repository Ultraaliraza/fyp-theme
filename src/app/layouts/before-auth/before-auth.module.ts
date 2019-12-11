import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeforeAuthRoutingModule } from './before-auth-routing.module';
import { ForgetpasswordComponent } from 'src/app/forgetpassword/forgetpassword.component';
import { RegisterComponent } from 'src/app/component/auth/register/register.component';
import { LoginComponent } from 'src/app/component/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UploadfilesService } from 'src/app/service/uploadfiles.service';
import { UserserviceService } from 'src/app/userservice.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetpasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BeforeAuthRoutingModule
  ],
  providers:[
    UserserviceService,
    UploadfilesService
  ]
})
export class BeforeAuthModule { }
