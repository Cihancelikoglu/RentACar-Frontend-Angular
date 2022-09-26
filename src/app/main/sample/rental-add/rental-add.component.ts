import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'app/models/carDetailDto';
import { CarImages } from 'app/models/carImage';
import { CarDetailService } from 'app/services/carDetail/car-detail.service';
import { CarimageService } from 'app/services/carImages/carimage.service';
import { RentalService } from 'app/services/rental/rental.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.scss']
})
export class RentalAddComponent implements OnInit {
  rentalAddForm :FormGroup
  carDetails: CarDetailDto[] = [];
  carImages: CarImages[] = [];
  baseImageUrl = "https://localhost:44330/Uploads/Images/"
  parivatecarId:number;
  
  constructor(
    private rentalService:RentalService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private carDetailService:CarDetailService,
    private activatedRoute: ActivatedRoute,
    private carImageService:CarimageService
  ) { }

  public contentHeader: object;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["carId"]) {
        this.getCarDetails(params["carId"]);
        this.getByCarImageId(params["carId"]);
      }
    });

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

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      carId: ["", Validators.required],
      // customerName: ["", Validators.required],
      rentDate: ["", Validators.required],
      returnDate: ["", Validators.required]
    })
  }

  addRental(){
    if(this.rentalAddForm.valid){
      let rentalModel = Object.assign({},this.rentalAddForm.value)
      this.rentalService.addRentals(rentalModel).subscribe(response=>{
        console.log(response);
        this.toastrService.success("Araç Kiralandı","Başarılı",{toastClass: 'toast ngx-toastr',closeButton: true})

      },responseError=>{
        console.log(responseError.error);
        this.toastrService.error("Bu Tarihler Arası Aracı Kiralayamazsınız","Başarısız",{toastClass: 'toast ngx-toastr',closeButton: true})
      })
    }
    else{
      this.toastrService.error("Eksik Alanları Doldurunuz","Dikkat",{toastClass: 'toast ngx-toastr',closeButton: true
        
      })
    }
  }

  getCarDetails(carId: number) {
    this.parivatecarId=carId;
    this.carDetailService.getCarDetails(carId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getByCarImageId(carId: number) {
    this.carImageService.getByCarImageId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }
}
