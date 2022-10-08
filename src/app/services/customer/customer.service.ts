import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Customer } from "app/models/customer";
import { ListResponseModel } from "app/models/listResponseModel";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CustomerService {

  constructor(private httpClient: HttpClient) {}


  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newPath = environment.apiUrl + "/customer/getall";
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
}
