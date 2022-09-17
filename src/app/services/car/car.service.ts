import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //API Call için gerekli
import { Observable } from 'rxjs';
import { CarsResponseModel } from 'app/models/carsResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:44330/api/cars/getcardetail";

  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<CarsResponseModel> {
    return this.httpClient.get<CarsResponseModel>(this.apiUrl)
  }
}
