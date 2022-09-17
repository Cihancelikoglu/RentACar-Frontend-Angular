import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //API Call için gerekli
import { Observable } from 'rxjs';
import { ColorsResponseModel } from 'app/models/colorsResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = "https://localhost:44330/api/colors/getall";

  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<ColorsResponseModel> {
    return this.httpClient.get<ColorsResponseModel>(this.apiUrl)
  }
}
