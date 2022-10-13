import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Findex } from 'app/models/findex';
import { ResponseModel } from 'app/models/responseModel';
import { SingleResponseModel } from 'app/models/singleResponseModel';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FindexService {

  constructor(private httpClient:HttpClient) { }

  getUserFindex(userId:number): Observable<SingleResponseModel<Findex>> {
    let newPath = environment.apiUrl + "/userfindex/getbyuserid?userId="+userId;
    return this.httpClient.get<SingleResponseModel<Findex>>(newPath);
  }


  checkIfFindex(userId:number,carFindex:number):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "/userfindex/findexcontrol?userId="+userId+"&carFindex="+carFindex;
    return this.httpClient.post<ResponseModel>(newPath,carFindex);
  }
}
