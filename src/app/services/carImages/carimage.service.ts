import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarImages } from 'app/models/carImage';
import { ListResponseModel } from 'app/models/listResponseModel';
import { ResponseModel } from 'app/models/responseModel';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarimageService {

  constructor(private httpClient:HttpClient) { }

  getCarImages(): Observable<ListResponseModel<CarImages>> {
    let newPath = environment.apiUrl + "/carimages/getall";
    return this.httpClient.get<ListResponseModel<CarImages>>(newPath);
  }

  getByCarImageId(carId:number): Observable<ListResponseModel<CarImages>> {
    let newPath = environment.apiUrl + "/carimages/getbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImages>>(newPath);
  }

  getByImageId(imageId:number): Observable<ListResponseModel<CarImages>> {
    let newPath = environment.apiUrl + "/carimages/getbyimageid?imageId="+imageId;
    return this.httpClient.get<ListResponseModel<CarImages>>(newPath);
  }

  addImage(formdata:FormData):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "/carimages/add";
    return this.httpClient.post<ResponseModel>(newPath,formdata);
  }

  deleteImage(carImage:CarImages): Observable<ResponseModel> {
    let newPath = environment.apiUrl + "/carimages/delete";
    return this.httpClient.post<ResponseModel>(newPath,carImage);
  }

  updateImage(formdata:FormData): Observable<ResponseModel> {
    let newPath = environment.apiUrl + "/carimages/update";
    return this.httpClient.post<ResponseModel>(newPath,formdata);
  }
}
