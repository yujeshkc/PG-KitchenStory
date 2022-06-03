import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router:Router
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //console.log(this.authService.getToken());
    
    if(this.authService.getToken() !== null ){
      const role = route.data['roles'] as Array<string>;
      if(role) {
        const match = this.authService.roleMatch(role);
        //console.log("match: " + role + " role: " + match)

        if(match) {
          //console.log('true got it');
          return true;
        } else {
          console.log('forbidden');
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
    }

    this.router.navigate(['/login'])
    console.log('false aa');
    return false;
    
  }
  
}
