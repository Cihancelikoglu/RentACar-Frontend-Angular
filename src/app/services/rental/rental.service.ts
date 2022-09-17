import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RentalsResponseModel } from "app/models/rentalResponseModel";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RentalService {
  apiUrl = "https://localhost:44330/api/rentals/getrentaldetail";

  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<RentalsResponseModel> {
    return this.httpClient.get<RentalsResponseModel>(this.apiUrl);
  }
}
