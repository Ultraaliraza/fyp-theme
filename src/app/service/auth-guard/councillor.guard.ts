import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { AuthenticationService } from '../auth-service/authentication.service';

@Injectable()
export class CouncillorGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let user;
    let status:boolean;

    this.authenticationService.user
    .subscribe(async userinfo => {
      user = await userinfo;
      console.log(user.acountType);
      if (user.acountType == 'councilors' || user.acountType == 'Councilors')
        return status= true;

      if (user.acountType == 'identifier' || user.acountType == 'Identifier')
        this.router.navigate(['/home']);
      if (user.acountType == 'donors' || user.acountType == 'Donors')
      this.router.navigate(['/donors']);
      if (user.acountType == 'admin' || user.acountType == 'Admin')
          this.router.navigate(['/admin']);
      return status = false;
    });
    return true;
  }
}
