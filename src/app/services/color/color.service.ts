import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //API Call için gerekli
import { Observable } from 'rxjs';
import { Color } from 'app/models/color';
import { ListResponseModel } from 'app/models/listResponseModel';
import { ResponseModel } from 'app/models/responseModel';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>> {
    let newPath = environment.apiUrl + "/colors/getall";
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  addColor(color:Color): Observable<ResponseModel> {
    let newPath = environment.apiUrl + "/colors/add";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }

  updateCar(color:Color): Observable<ResponseModel> {
    let newPath = environment.apiUrl + "/colors/update";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }

  deleteColor(color:Color): Observable<ResponseModel> {
    let newPath = environment.apiUrl + "/colors/delete";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }

  getByIdColor(colorId:number): Observable<ListResponseModel<Color>> {
    let newPath = environment.apiUrl + "/colors/getbyid?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

}
