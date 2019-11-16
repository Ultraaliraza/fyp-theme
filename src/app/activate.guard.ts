import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserserviceService } from './userservice.service';
import { AuthenticationService } from './service/auth-service/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class ActivateGuard {
  // export class ActivateGuard implements CanActivate {
 
  // canActivate(){
    
  // }
}
