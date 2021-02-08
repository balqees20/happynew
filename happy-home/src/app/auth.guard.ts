import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: LoginService,private router: Router){}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.service.loggedIn()){
        if (route.data.role && this.service.role() != route.data.role) {
          this.router.navigate(['/indexc'])
          return false;
        }
        else {
          return true
        }
      
      }

    this.router.navigate(['/login']);
    return false
  }
  
}
