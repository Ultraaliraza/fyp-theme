import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class BeforeAuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let user = localStorage.getItem('userMeta');
    if (!user)
      return true;

    this.router.navigate(['/home']);
    return false;
  }

}
