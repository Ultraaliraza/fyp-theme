import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserserviceService } from './userservice.service';
import { AuthenticationService } from './service/auth-service/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class ActivateGuard implements CanActivate {
  isLogin: boolean = false;
  constructor(private userservice: UserserviceService, private router: Router, private authService: AuthenticationService) { 
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.authService.user.subscribe(res => {
        this.isLogin = res.isLogin;
      });
      if (this.isLogin) {
      console.log('here i am ');
      return true;
    } else {
      return false;
    }
  }
}
