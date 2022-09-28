import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarDetailDto } from 'app/models/carDetailDto';
import { RentalDate } from 'app/models/rentalDate';
import { RentalDates } from 'app/models/rentalDates';
import { RentalDetailDto } from 'app/models/rentalDetailDto';
import { CarDetailService } from 'app/services/carDetail/car-detail.service';
import { RentalService } from 'app/services/rental/rental.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rental-date-control',
  templateUrl: './rental-date-control.component.html',
  styleUrls: ['./rental-date-control.component.scss']
})
export class RentalDateControlComponent implements OnInit {
  rentalAddForm: FormGroup
  carDetails: CarDetailDto[] = [];
  carIdUrl: Number;
  rentals: RentalDate[] = [];
  rentDatee: Date;
  returnDatee: Date;

  constructor(
    private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["carId"]) {
        this.getCarDetails(params["carId"]);
        this.createRentalCheckForm(params["carId"]);
      }
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  createRentalCheckForm(carId: number) {
    this.carIdUrl = carId;
    this.rentalAddForm = this.formBuilder.group({
      carId: ["", Validators.required],
      rentDate: ["", Validators.required],
      returnDate: ["", Validators.required]
    })
  }

  rentalDateControl(car: CarDetailDto) {
    if (this.rentalAddForm.valid) {
      let rentalModel = Object.assign({}, this.rentalAddForm.value)
      this.rentalService.rentalDateControl(rentalModel).subscribe(response => {
        console.log(response);
        this.toastrService.success("Araç Kiralanabilir", "Yönlendiriliyorsunuz", { toastClass: 'toast ngx-toastr', closeButton: true })

        var eventStartTime = new Date(this.rentDatee);
        var eventEndTime = new Date(this.returnDatee);
        var rentalPeriod: number = Math.floor((eventEndTime.valueOf() - eventStartTime.valueOf()) / (1000 * 60 * 60 * 24));

        this.rentalService.addToRentalDetail(car, this.rentDatee, this.returnDatee, rentalPeriod);
        this.rentals = this.rentalService.listRentalDetail();

        if (!localStorage.getItem('RentalsDetail')) {
          localStorage.setItem('RentalsDetail', JSON.stringify(this.rentals));
        }
        else {
          localStorage.setItem('RentalsDetail', JSON.stringify(this.rentals));
          this.rentals = JSON.parse(localStorage.getItem('RentalsDetail'))
        }

        setTimeout(() => {
          window.location.href = "/cars/rental/" + this.carIdUrl;
        }, 3000);

      }, responseError => {
        console.log(responseError.error);
        this.toastrService.error("Bu Tarihler Arası Aracı Kiralayamazsınız", "Başarısız", {
          toastClass: 'toast ngx-toastr',
          closeButton: true
        })
      })
    }
    else {
      this.toastrService.error("Eksik Alanları Doldurunuz", "Dikkat", {
        toastClass: 'toast ngx-toastr',
        closeButton: true
      })
    }
  }

  getCarDetails(carId: number) {
    this.carDetailService.getCarDetails(carId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

}