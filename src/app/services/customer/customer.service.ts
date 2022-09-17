import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CustomersResponseModel } from "app/models/customerResponseModel";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  apiUrl = "https://localhost:44330/api/customer/getall";

  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<CustomersResponseModel> {
    return this.httpClient.get<CustomersResponseModel>(this.apiUrl);
  }
}
