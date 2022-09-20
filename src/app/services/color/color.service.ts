import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //API Call için gerekli
import { Observable } from 'rxjs';
import { Color } from 'app/models/color';
import { ListResponseModel } from 'app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = "https://localhost:44330";

  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>> {
    let newPath = this.apiUrl + "/api/colors/getall";
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }
}
