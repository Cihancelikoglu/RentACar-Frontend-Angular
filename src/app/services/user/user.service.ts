import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from 'app/models/singleResponseModel';
import { User } from 'app/models/user';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getByUser(eposta:string): Observable<SingleResponseModel<User>> {
    let newPath = environment.apiUrl + "/users/getbyuser?eposta="+eposta;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
}
