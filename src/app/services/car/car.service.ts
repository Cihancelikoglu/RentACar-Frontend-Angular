import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; //API Call için gerekli
import { Observable } from "rxjs";
import { ListResponseModel } from "app/models/listResponseModel";
import { CarDetailDto } from "app/models/carDetailDto";
import { Brand } from "app/models/brand";
import { Color } from "app/models/color";
import { ResponseModel } from "app/models/responseModel";
import { Car } from "app/models/car";
import { environment } from "environments/environment";
import { SingleResponseModel } from "app/models/singleResponseModel";

@Injectable({
  providedIn: "root",
})
export class CarService {

  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = environment.apiUrl + "/cars/getcardetail";
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  addCar(car:Car): Observable<ResponseModel> {
    let newPath = environment.apiUrl + "/cars/add";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

  updateCar(car:Car): Observable<ResponseModel> {
    let newPath = environment.apiUrl + "/cars/update";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

  deleteCar(car:Car): Observable<ResponseModel> {
    let newPath = environment.apiUrl + "/cars/delete";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

  getByIdCar(carId:number): Observable<SingleResponseModel<Car>> {
    let newPath = environment.apiUrl + "/cars/getbyid?carId="+carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = environment.apiUrl + "/cars/getbycolor?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = environment.apiUrl + "/cars/getbybrand?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarFilter(colorId: number, brandId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = environment.apiUrl + "/cars/getcarfilter?carId=" + colorId + "&brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);

  }
}
