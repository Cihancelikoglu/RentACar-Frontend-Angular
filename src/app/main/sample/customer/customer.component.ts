import { Component, OnInit } from "@angular/core";
import { Customer } from "app/models/customer";
import { CustomerService } from "app/services/customer/customer.service";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"],
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  constructor(private customerService: CustomerService) {}

  public contentHeader: object;

  /**
   * On init
   */
  ngOnInit() {
    this.getCustomer();
    this.contentHeader = {
      headerTitle: "Customers",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Anasayfa",
            isLink: true,
            link: "/",
          },
          {
            name: "Customers",
            isLink: false,
          },
        ],
      },
    };
  }
  getCustomer() {
    this.customerService.getCustomers().subscribe(response=>{
      this.customers = response.data;
    })
  }
}
