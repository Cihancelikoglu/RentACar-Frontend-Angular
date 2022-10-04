import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl, Validators  } from '@angular/forms';
import { Brand } from 'app/models/brand';
import { Color } from 'app/models/color';
import { BrandService } from 'app/services/brand/brand.service';
import { CarService } from 'app/services/car/car.service';
import { ColorService } from 'app/services/color/color.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'app/models/car';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.scss']
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm:FormGroup;
  car:Car;
  colors:Color[] = [];
  brands:Brand[] = [];

  constructor(
    private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService,
    private colorService:ColorService,
    private brandService:BrandService,
    private router:ActivatedRoute,
  ) { }
  public contentHeader: object;

  ngOnInit(): void {
    this.getColors();
    this.getBrands();
    this.getByIdCar();
    this.careateCarUpdateForm();

    this.contentHeader = {
      headerTitle: "Car Update",
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
            name: "Cars",
            isLink: true,
            link: "/cars",
          },
          {
            name: "Car Update",
            isLink: false,
          }
        ],
      },
    };
  }

  careateCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      brandId:[this.car.brandId,Validators.required],
      colorId:[this.car.colorId,Validators.required],
      carName:[this.car.carName,Validators.required],
      modelYear:[this.car.modelYear,Validators.required],
      dailyPrice:[this.car.dailyPrice,Validators.required],
      description:[this.car.description,Validators.required]
    })
  }

  carUpdate() {
    if(this.carUpdateForm.valid){
      let carModel: Car = { carId: this.car.carId, ...this.carUpdateForm.value };
      this.carService.updateCar(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        setTimeout(() => {
          window.location.href = "/cars"
        }, 3000);
      },errorResponse=>{
        if(errorResponse.error.Errors){
          if(errorResponse.error.Errors.length>0){
            for (let i = 0; i < errorResponse.error.Errors.length; i++) {
              this.toastrService.error(errorResponse.error.Errors[i].ErrorMessage,"Doğrulama Hatası",{toastClass: 'toast ngx-toastr'})
            }
          }
        }
        else{
          this.toastrService.error(errorResponse.error.message,"Doğrulama Hatası",{toastClass: 'toast ngx-toastr'})
        }
      })
    }
    else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
  }


  getByIdCar(){
    this.carService.getByIdCar(this.router.snapshot.params.carId).subscribe((response:any)=>{
      this.car = response.data;
      this.careateCarUpdateForm();
    })
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
}
