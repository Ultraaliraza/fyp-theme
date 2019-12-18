import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutComponent } from './about/about.component';
import { AfterAuthGuard } from './service/auth-guard/after-auth.guard';
import { BeforeAuthGuard } from './service/auth-guard/before-auth.guard';
import { RedirectGuardService } from './service/auth-guard/redirect-guard.guard';
import { IdentifierGuard } from './service/auth-guard/identifier.guard';
import { CouncillorGuard } from './service/auth-guard/councillor.guard';
import { DonorsGuard } from './service/auth-guard/donors.guard';
import { DonorsComponent } from './donors/donors.component';
import { MotivatorComponent } from './motivator/motivator.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  
  { path: '', redirectTo: '', pathMatch: 'full', canActivate: [RedirectGuardService] },
  
  { path: 'contactus ', component: ContactusComponent },
  { path: 'about ', component: AboutComponent },

  { path: 'home', component: HomeComponent, canActivate: [IdentifierGuard] },
  { path: 'motivator', component: MotivatorComponent, canActivate: [CouncillorGuard] },
  { path: 'donors', component: DonorsComponent, canActivate: [DonorsGuard] },

  {
    path: '', loadChildren: './layouts/before-auth/before-auth.module#BeforeAuthModule',
    canActivate: [BeforeAuthGuard]
  },
  {
    path: '', loadChildren: './layouts/after-auth/after-auth.module#AfterAuthModule',
    canActivate: [AfterAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
