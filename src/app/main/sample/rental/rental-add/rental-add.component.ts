import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'app/models/carDetailDto';
import { CarImages } from 'app/models/carImage';
import { RentalDate } from 'app/models/rentalDate';
import { CarDetailService } from 'app/services/carDetail/car-detail.service';
import { CarimageService } from 'app/services/carImages/carimage.service';
import { CreditCartService } from 'app/services/creditCart/credit-cart.service';
import { RentalService } from 'app/services/rental/rental.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.scss']
})
export class RentalAddComponent implements OnInit {
  rentalAddForm: FormGroup
  paymentAddForm: FormGroup
  carDetails: CarDetailDto
  carImages: CarImages[] = [];
  baseImageUrl = "https://demotakipet.website/Uploads/Images/"
  parivatecarId: number;
  rentals: RentalDate[] = [];
  setErrorResponse: any;

  constructor(
    private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarimageService,
    private creditCartService: CreditCartService,
    private location: Location
  ) { }

  public contentHeader: object;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["carId"]) {
        this.getCarDetails(params["carId"]);
        this.getByCarImageId(params["carId"]);
      }
    });

    this.getLocalStorage();
    this.createRentalForm()
    this.createPaymentAddForm();
    this.contentHeader = {
      headerTitle: "Payment",
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
            name: this.parivatecarId,
            isLink: false,
          },
          {
            name: "Payment",
            isLink: false,
          },
        ],
      },
    };
  }

  getLocalStorage() {
    this.rentals = JSON.parse(localStorage.getItem('RentalsDetail'))
  }

  getCarDetails(carId: number) {
    this.parivatecarId = carId;
    this.carDetailService.getCarDetails(carId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getByCarImageId(carId: number) {
    this.carImageService.getByCarImageId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  createRentalForm() {
    this.rentalAddForm = this.formBuilder.group({
      carId: ["", Validators.required],
      rentDate: ["", Validators.required],
      returnDate: ["", Validators.required],
      totalPrice: ["", Validators.required],
      totalDay: ["", Validators.required]
    })
  }

  createPaymentAddForm() {
    this.paymentAddForm = this.formBuilder.group({
      cardNumber: ["", Validators.required],
      expireYearMonth: ["", Validators.required],
      cvv: ["", Validators.required],
      cardHolder: ["", Validators.required],
      balance: ["", Validators.required]
    })
  }

  addRental() {
    if (this.rentalAddForm.valid && this.paymentAddForm.valid) {
      let rentalModel = Object.assign({}, this.rentalAddForm.value)
      let paymentModel = Object.assign({}, this.paymentAddForm.value)

      this.creditCartService.peymentControl(paymentModel).subscribe(paymentResponse => {
        if(paymentResponse != null){
          
        }
        this.rentalService.addRentals(rentalModel).subscribe(rentalResponse => {
          this.toastrService.success(rentalResponse.message, "Ba??ar??l??", { toastClass: 'toast ngx-toastr' })
        }, errorResponse => {
          this.setErrorResponse = errorResponse;
          this.errorResponse()
        })

        this.toastrService.success("??deme Ba??ar??yla Ger??ekle??ti", "Ara?? Kiraland??", {toastClass: 'toast ngx-toastr',closeButton: true
          
        })

        localStorage.removeItem("RentalsDetail");
        setTimeout(() => {
          window.location.href = "/cars"
        }, 3000);

      }, errorResponse => {
        this.setErrorResponse = errorResponse;
        this.errorResponse()
      })
    }
    else {
      this.toastrService.error("Eksik Alanlar?? Doldurunuz", "Dikkat", {
        toastClass: 'toast ngx-toastr', closeButton: true
      })
    }
  }

  removeStorage() {
    localStorage.removeItem("RentalsDetail");
    this.toastrService.error("??deme ??ptal Edildi", "Y??nlendiriliyorsunuz", { toastClass: 'toast ngx-toastr', closeButton: true })
    setTimeout(() => {
      this.location.back();
    }, 3000);
  }

  errorResponse() {
    if (this.setErrorResponse.error.Errors) {
      if (this.setErrorResponse.error.Errors.length > 0) {
        for (let i = 0; i < this.setErrorResponse.error.Errors.length; i++) {
          this.toastrService.error(this.setErrorResponse.error.Errors[i].ErrorMessage, "Do??rulama Hatas??", { toastClass: 'toast ngx-toastr' })
        }
      }
    }
    else {
      this.toastrService.error(this.setErrorResponse.error.message, "Do??rulama Hatas??", { toastClass: 'toast ngx-toastr' })
    }
  }


}
