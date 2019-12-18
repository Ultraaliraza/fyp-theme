import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../auth-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let user;
    this.authService.user
    .subscribe(async userinfo => {
      user = await userinfo;
      console.log(user.acountType);
      if (user && user.acountType) {
        if (user.acountType == 'identifier' || user.acountType == 'Identifier')
          this.router.navigate(['/home']);
        if (user.acountType == 'donors' || user.acountType == 'Donors')
          this.router.navigate(['/donors']);
        if (user.acountType == 'councilors' || user.acountType == 'Councilors')
          this.router.navigate(['/motivator']);
          if (user.acountType == 'admin' || user.acountType == 'Admin')
          this.router.navigate(['/admin']);
        return true;
      }
    });
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
