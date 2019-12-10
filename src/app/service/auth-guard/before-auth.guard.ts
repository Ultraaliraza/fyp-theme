import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable()
export class BeforeAuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let user = localStorage.getItem('userMeta');
    console.log(user)
    if (!user)
      return true;

    this.router.navigate(['/home']);
    return false;
  }
}
