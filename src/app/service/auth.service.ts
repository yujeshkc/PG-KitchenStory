import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private url:string= "http://localhost:3000/register";
  private urlLogin:string= "http://localhost:3000/login";

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  submitRegister(form:any){    
    return this.httpClient.post(this.url, form, {
      observe: 'body'
    });
  }

  login(form: any) {
    return this.httpClient.post(this.urlLogin, form, {
      observe: 'body'
    });
  }

  public getToken(){
      return localStorage.getItem('token');
  }

  public getRoles() {
    return localStorage.getItem('role');
  }

  public roleMatch(allowedRoles: string | any[]): boolean {
      
    let isMatch = false;

    const userRoles = this.getRoles();      
      if (userRoles != null && userRoles) {
        if (userRoles == allowedRoles) {          
          isMatch = true;
        } else {
          isMatch = false;
        }
      }

      return isMatch;
   
  }

  public isLoggedIn(){
    return this.getRoles() && this.getToken();
  }

  public clear() {
    localStorage.clear();
  }


}
