import { Component, OnInit } from "@angular/core";
import { RentalDetailDto } from "app/models/rentalDetailDto";
import { RentalService } from "app/services/rental/rental.service";

@Component({
  selector: "app-rentals",
  templateUrl: "./rentals.component.html",
  styleUrls: ["./rentals.component.scss"],
})
export class RentalsComponent implements OnInit {
  rentals: RentalDetailDto[] = [];
  constructor(private rentalService: RentalService) {}

  public contentHeader: object;

  /**
   * On init
   */
  ngOnInit() {
    this.getRentals();
    this.contentHeader = {
      headerTitle: "Rentals",
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
            name: "Rentals",
            isLink: false,
          },
        ],
      },
    };
  }
  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
    });
  }
}
