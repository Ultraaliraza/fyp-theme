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

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactusComponent
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
    UploadfilesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
