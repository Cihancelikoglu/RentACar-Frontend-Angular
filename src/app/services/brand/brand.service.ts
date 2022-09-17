import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //API Call için gerekli
import { Observable } from 'rxjs';
import { BrandsResponseModel } from 'app/models/brandsResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = "https://localhost:44330/api/brands/getall";

  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<BrandsResponseModel> {
    return this.httpClient.get<BrandsResponseModel>(this.apiUrl)
  }
}
