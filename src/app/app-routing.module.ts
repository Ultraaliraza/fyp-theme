import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { HomeComponent } from './home/home.component';
import { pathMatch } from 'tough-cookie';
// import { CanActivate } from '@angular/router';
// import { ActivateGuard } from './activate.guard';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'register',
    component: RegisterComponent
  }, {
    path: 'forgetpassword',
    component: ForgetpasswordComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  { path: '**', 
   redirectTo: '/LoginComponent' ,
   pathMatch: 'full'

 },
 { path: '',
 redirectTo: '/loginComponent',
 pathMatch: 'full'
}
//, 
 
//  {
//    path:'marriage' ,
//    component : MarriageComponent

//  } , { 


//   path: 'proverty' ,
  
//   component : ProvertyComponent
//  } , {

//   path : 'education' ,

//   component : EducationComponent
//  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
