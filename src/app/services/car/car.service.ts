import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; //API Call için gerekli
import { Observable } from "rxjs";
import { ListResponseModel } from "app/models/listResponseModel";
import { CarDetailDto } from "app/models/carDetailDto";
import { Brand } from "app/models/brand";
import { Color } from "app/models/color";
import { ResponseModel } from "app/models/responseModel";
import { Car } from "app/models/car";

@Injectable({
  providedIn: "root",
})
export class CarService {
  apiUrl = "https://localhost:44330/api";

  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "/cars/getcardetail";
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  addCar(car:Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/cars/add";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

  getCarsByColor(colorId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath =
      this.apiUrl + "/cars/getbycolor?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath =
      this.apiUrl + "/cars/getbybrand?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarFilter(colorId: number, brandId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "/cars/getcarfilter?carId=" + colorId + "&brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);

  }
}
