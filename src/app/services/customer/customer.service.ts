import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Customer } from "app/models/customer";
import { ListResponseModel } from "app/models/listResponseModel";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  apiUrl = "https://localhost:44330/api/customer/getall";

  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl);
  }
}
