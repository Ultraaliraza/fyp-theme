import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AfterAuthGuard } from './service/auth-guard/after-auth.guard';
import { UserserviceService } from './userservice.service';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutComponent } from './about/about.component';
import { UploadfilesService } from './service/uploadfiles.service';
import { BeforeAuthGuard } from './service/auth-guard/before-auth.guard';
import { DonorsGuard } from './service/auth-guard/donors.guard';
import { CouncillorGuard } from './service/auth-guard/councillor.guard';
import { IdentifierGuard } from './service/auth-guard/identifier.guard';
import { RedirectGuardService } from './service/auth-guard/redirect-guard.guard';
import { DonorsComponent } from './donors/donors.component';
import { MotivatorComponent } from './motivator/motivator.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactusComponent,
    HomeComponent,
    MotivatorComponent,
    DonorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    AfterAuthGuard,
    BeforeAuthGuard,
    UserserviceService,
    UploadfilesService,
    DonorsGuard,
    CouncillorGuard,
    IdentifierGuard,
    RedirectGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
