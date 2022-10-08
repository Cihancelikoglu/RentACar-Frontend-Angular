import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //API Call için gerekli
import { Observable } from 'rxjs';
import { ListResponseModel } from 'app/models/listResponseModel';
import { Brand } from 'app/models/brand';
import { ResponseModel } from 'app/models/responseModel';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = environment.apiUrl + "/brands/getall";
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  addBrand(brand:Brand): Observable<ResponseModel> {
    let newPath = environment.apiUrl + "/brands/add";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

  updateBrand(brand:Brand): Observable<ResponseModel> {
    let newPath = environment.apiUrl + "/brands/update";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

  deleteBrand(brand:Brand): Observable<ResponseModel> {
    let newPath = environment.apiUrl + "/brands/delete";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

  getByIdBrand(brandId:number): Observable<ListResponseModel<Brand>> {
    let newPath = environment.apiUrl + "/brands/getbyid?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
}
