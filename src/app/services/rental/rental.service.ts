import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ListResponseModel } from "app/models/listResponseModel";
import { RentalDetailDto } from "app/models/rentalDetailDto";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RentalService {
  apiUrl = "https://localhost:44330";

  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<RentalDetailDto>> {
    let newPath = this.apiUrl + "/api/rentals/getrentaldetail";
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(newPath);
  }


  rentalDateControl(rental:RentalDetailDto){
    let newPath = this.apiUrl + "/api/rentals/rentaldatecontrol";
    return this.httpClient.post(newPath,rental);
  }

  addRentals(rental: RentalDetailDto){
    let newPath = this.apiUrl + "/api/rentals/add";
    return this.httpClient.post(newPath,rental);
  }
}
