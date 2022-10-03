import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //API Call için gerekli
import { Observable } from 'rxjs';
import { ListResponseModel } from 'app/models/listResponseModel';
import { Brand } from 'app/models/brand';
import { ResponseModel } from 'app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = "https://localhost:44330/api";

  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + "/brands/getall";
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  addBrand(brand:Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/brands/add";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }
}
