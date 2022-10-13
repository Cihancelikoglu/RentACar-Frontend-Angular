import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from 'app/models/loginModel';
import { SingleResponseModel } from 'app/models/singleResponseModel';
import { TokenModel } from 'app/models/tokenModel';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private htttpClient: HttpClient,private localStorage:LocalStorageService) { }

  login(loginModel:LoginModel){
    let newPath = environment.apiUrl +"/auth/login";
    return this.htttpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel) 
  }

  logOut(){
    this.localStorage.removeLocalStorage('token');
    this.localStorage.removeLocalStorage('Account');
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
