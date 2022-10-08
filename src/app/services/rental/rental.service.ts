import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CarDetailDto } from "app/models/carDetailDto";
import { ListResponseModel } from "app/models/listResponseModel";
import { RentalDate } from "app/models/rentalDate";
import { RentalDates } from "app/models/rentalDates";
import { RentalDetailDto } from "app/models/rentalDetailDto";
import { ResponseModel } from "app/models/responseModel";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RentalService {

  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<RentalDetailDto>> {
    let newPath = environment.apiUrl + "/rentals/getrentaldetail";
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(newPath);
  }


  rentalDateControl(rental:RentalDetailDto):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "/rentals/rentaldatecontrol";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

  addRentals(rental: RentalDetailDto):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "/rentals/add";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }


  addToRentalDetail(car:CarDetailDto,rentDate:Date,returnDate:Date,totalDay:number){
    let rentalItem = new RentalDate();
    rentalItem.rentDate = rentDate;
    rentalItem.carId = car.carId;
    rentalItem.returnDate = returnDate
    rentalItem.carName = car.carName;
    rentalItem.price = car.dailyPrice * totalDay;
    rentalItem.totalDay = totalDay;
    RentalDates.push(rentalItem)
  }

  listRentalDetail():RentalDate[]{
    return RentalDates;
  }
  
}
