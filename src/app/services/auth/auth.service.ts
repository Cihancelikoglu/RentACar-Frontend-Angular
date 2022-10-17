import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginModel } from 'app/models/loginModel';
import { RegisterModel } from 'app/models/registerModel';
import { SingleResponseModel } from 'app/models/singleResponseModel';
import { TokenModel } from 'app/models/tokenModel';
import { User } from 'app/models/user';
import { Userss } from 'app/models/users';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService;
  email:string
  user:User;

  // private loggedIn = new BehaviorSubject<boolean>(this.isTokenExpired()); //https://loiane.com/2017/08/angular-hide-navbar-login-page/

  // public get loginStatus() {
  //   return this.loggedIn.asObservable();
  // }

  // public get isLoggedIn() {
  //   return this.loggedIn.getValue();
  // }

  // public set isLoggedIn(status: boolean) {
  //   this.loggedIn.next(status);
  // }

  // private isTokenExpired(): boolean {
  //   let token = this.localStorage.getLocalStorage('token');
  //   if (token != null) {
  //     return !this.jwtHelper.isTokenExpired(token);
  //   }
  //   return false;
  // }

  constructor(private htttpClient: HttpClient,private localStorage:LocalStorageService,private userService:UserService) { }

  login(loginModel:LoginModel){
    let newPath = environment.apiUrl +"/auth/login";
    return this.htttpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel) 
  }

  register(registerModel:RegisterModel){
    let newPath = environment.apiUrl +"/auth/register";
    return this.htttpClient.post<SingleResponseModel<RegisterModel>>(newPath,registerModel) 
  }

  logOut(){
    this.localStorage.removeLocalStorage('token');
  }

  getUser(): Userss | undefined {
    let token = this.localStorage.getLocalStorage('token');
    if (token != null) {
      let tokenDetails = Object.entries(this.jwtHelper.decodeToken(token));
      let user: Userss = new Userss;
      tokenDetails.forEach(detail => {
        switch (detail[0]) {
          case "email": {
            user.email = String(detail[1]);
            break;
          }
          case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": {
            user.firstName = String(detail[1]);
            break;
          }
          case "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": {
            user.role = detail[1] as Array<string>
            break;
          }
          case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": {
            user.id = Number(detail[1]);
          }
        }
      });
      if (!user.role) {  //if the user does not have a role
        user.role = [];
      }
      return user;
    }
    return undefined;
  }

  isAuthenticated(){
    if(localStorage.getItem('token')){
      return true;
    }
    else{
      return false
    }
  }
}
