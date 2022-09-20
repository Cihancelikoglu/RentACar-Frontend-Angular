import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ListResponseModel } from "app/models/listResponseModel";
import { RentalDetailDto } from "app/models/rentalDetailDto";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RentalService {
  apiUrl = "https://localhost:44330/api/rentals/getrentaldetail";

  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<RentalDetailDto>> {
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(this.apiUrl);
  }
}
