import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'app/models/car';
import { CarDetailDto } from 'app/models/carDetailDto';
import { RentalDate } from 'app/models/rentalDate';
import { CarService } from 'app/services/car/car.service';
import { CarDetailService } from 'app/services/carDetail/car-detail.service';
import { FindexService } from 'app/services/findex/findex.service';
import { LocalStorageService } from 'app/services/localStorage/local-storage.service';
import { RentalService } from 'app/services/rental/rental.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rental-date-control',
  templateUrl: './rental-date-control.component.html',
  styleUrls: ['./rental-date-control.component.scss']
})
export class RentalDateControlComponent implements OnInit {
  rentalAddForm: FormGroup
  carDetails: CarDetailDto;
  carIdUrl: Number;
  rentals: RentalDate[] = [];
  rentDatee: Date;
  returnDatee: Date;
  eventStartTime: Date;
  eventEndTime: Date;
  rentalPeriod = 0;
  setErrorResponse: any;
  car: Car;

  userId: number;
  findex: number;

  constructor(
    private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private _localStorage: LocalStorageService,
    private findexService: FindexService,
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["carId"]) {
        this.getCarDetails(params["carId"]);
        this.createRentalCheckForm(params["carId"]);
        this.getByCarId(params["carId"])
      }
    });
  }

  open(content) {
    if (this._localStorage.getLocalStorage('token')) {
      this.modalService.open(content);
    }
    else {
      this.toastrService.info("Lütfen Sisteme Giriş Yapınız", "Dikkat", { toastClass: 'toast ngx-toastr', })
    }
  }

  getCarDetails(carId: number) {
    this.carDetailService.getCarDetails(carId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getByCarId(carId: number) {
    this.carService.getByIdCar(carId).subscribe((response) => {
      this.car = response.data;
      this.findex = response.data.findex
    });
  }

  getUserFindex() {
    let userid = this._localStorage.getLocalStorage('Account')
    this.userId = JSON.parse(userid)
    this.findexService.getUserFindex(this.userId).subscribe((response) => {
      // this._localStorage.addLocalStorage("findex",JSON.stringify(response.data.findex))
    })
  }

  createRentalCheckForm(carId: number) {
    this.carIdUrl = carId;
    this.rentalAddForm = this.formBuilder.group({
      carId: ["", Validators.required],
      rentDate: ["", Validators.required],
      returnDate: ["", Validators.required]
    })
  }

  rentalControl(car: CarDetailDto) {
    if (this.rentalAddForm.valid) {
      let rentalModel = Object.assign({}, this.rentalAddForm.value)
      this.rentalService.rentalDateControl(rentalModel).subscribe(response => {

        if (response != null) {
          this.checkIfFindex()
        }

        this.totalRentDate()

        this.rentalService.addToRentalDetail(car, this.rentDatee, this.returnDatee, this.rentalPeriod);
        this.rentals = this.rentalService.listRentalDetail();

        this.addLocalStorage()

      }, errorResponse => {
        this.setErrorResponse = errorResponse;
        this.errorResponse()
      })
    }
    else {
      this.toastrService.error("Eksik Alanları Doldurunuz", "Dikkat", { toastClass: 'toast ngx-toastr', })
    }
  }

  addLocalStorage() {
    if (!this._localStorage.getLocalStorage('RentalsDetail')) {
      this._localStorage.addLocalStorage("RentalsDetail", JSON.stringify(this.rentals))
    }
    else {
      this._localStorage.addLocalStorage('RentalsDetail', JSON.stringify(this.rentals));
      this.rentals = JSON.parse(this._localStorage.getLocalStorage('RentalsDetail'))
    }
  }

  totalRentDate() {
    this.eventStartTime = new Date(this.rentDatee);
    this.eventEndTime = new Date(this.returnDatee);
    this.rentalPeriod = Math.floor((this.eventEndTime.valueOf() - this.eventStartTime.valueOf()) / (1000 * 60 * 60 * 24));
  }

  checkIfFindex() {
    this.getUserFindex()
    let findex = this.findex;
    this.findexService.checkIfFindex(this.userId, findex).subscribe((response) => {

      this.toastrService.success(response.message, "Yönlendiriliyorsunuz", { toastClass: 'toast ngx-toastr', closeButton: true })
      setTimeout(() => {
        window.location.href = "/rental/" + this.carIdUrl;
      }, 3000);

    }, errorResponse => {
      this.setErrorResponse = errorResponse;
      this.errorResponse()
    })
  }

  errorResponse() {
    if (this.setErrorResponse.error.Errors) {
      if (this.setErrorResponse.error.Errors.length > 0) {
        for (let i = 0; i < this.setErrorResponse.error.Errors.length; i++) {
          this.toastrService.error(this.setErrorResponse.error.Errors[i].ErrorMessage, "Doğrulama Hatası", { toastClass: 'toast ngx-toastr' })
        }
      }
    }
    else {
      this.toastrService.error(this.setErrorResponse.error.message, "Doğrulama Hatası", { toastClass: 'toast ngx-toastr' })
    }
  }
  
}