import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarDetailDto } from 'app/models/carDetailDto';
import { ListResponseModel } from 'app/models/listResponseModel';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  constructor(private httpClient:HttpClient) { }

  getCarDetails(carId:number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = environment.apiUrl + "/cars/getbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }
}
