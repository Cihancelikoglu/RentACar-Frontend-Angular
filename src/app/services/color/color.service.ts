import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //API Call için gerekli
import { Observable } from 'rxjs';
import { Color } from 'app/models/color';
import { ListResponseModel } from 'app/models/listResponseModel';
import { ResponseModel } from 'app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = "https://localhost:44330/api";

  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>> {
    let newPath = this.apiUrl + "/colors/getall";
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  addColor(color:Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/colors/add";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }
}
