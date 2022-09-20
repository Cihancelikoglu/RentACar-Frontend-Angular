import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarImages } from 'app/models/carImage';
import { ListResponseModel } from 'app/models/listResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarimageService {
  apiUrl = "https://localhost:44330";

  constructor(private httpClient:HttpClient) { }

  getCarImages(): Observable<ListResponseModel<CarImages>> {
    let newPath = this.apiUrl + "/api/carimages/getall";
    return this.httpClient.get<ListResponseModel<CarImages>>(newPath);
  }

  getByCarImageId(carId:number): Observable<ListResponseModel<CarImages>> {
    let newPath = this.apiUrl + "/api/carimages/getbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImages>>(newPath);
  }

}
