import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from 'app/models/loginModel';
import { SingleResponseModel } from 'app/models/singleResponseModel';
import { TokenModel } from 'app/models/tokenModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiAuth = 'https://demotakipet.website/api/auth';
  constructor(private htttpClient: HttpClient) { }

  login(loginModel:LoginModel){
    let newPath = this.apiAuth+"/login";
    return this.htttpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel) 
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
