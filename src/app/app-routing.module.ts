import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutComponent } from './about/about.component';
import { AfterAuthGuard } from './service/auth-guard/after-auth.guard';
import { BeforeAuthGuard } from './service/auth-guard/before-auth.guard';

const routes: Routes = [

  { path: 'contactus ', component: ContactusComponent },
  { path: 'about ', component: AboutComponent },

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
