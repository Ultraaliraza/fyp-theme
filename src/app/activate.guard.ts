import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserserviceService} from './userservice.service';
@Injectable({
  providedIn: 'root'
})
export class ActivateGuard implements CanActivate {

  constructor(private userservice: UserserviceService , private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.userservice.ishomeright()){

        return true ;
      }

      else
      {
        alert("Redirecting to Home Page");
          this.router.navigate(['/login']);              
 
      }

    return true;

  }
  
}
