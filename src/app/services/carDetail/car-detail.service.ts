import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarDetailDto } from 'app/models/carDetailDto';
import { ListResponseModel } from 'app/models/listResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  apiUrl = "https://localhost:44330";

  constructor(private httpClient:HttpClient) { }

  getCarDetails(carId:number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "/api/cars/getbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }
}
