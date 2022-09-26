import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; //API Call için gerekli
import { Observable } from "rxjs";
import { ListResponseModel } from "app/models/listResponseModel";
import { CarDetailDto } from "app/models/carDetailDto";
import { Brand } from "app/models/brand";
import { Color } from "app/models/color";

@Injectable({
  providedIn: "root",
})
export class CarService {
  apiUrl = "https://localhost:44330";

  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "/api/cars/getcardetail";
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarsByColor(colorId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath =
      this.apiUrl + "/api/cars/getbycolor?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath =
      this.apiUrl + "/api/cars/getbybrand?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarFilter(colorId: number, brandId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "/api/cars/getcarfilter?carId=" + colorId + "&brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);

  }
}
