import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //API Call için gerekli
import { Observable } from 'rxjs';
import { ListResponseModel } from 'app/models/listResponseModel';
import { Brand } from 'app/models/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = "https://localhost:44330";

  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + "/api/brands/getall";
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
}
