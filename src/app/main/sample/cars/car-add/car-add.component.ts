import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl, Validators  } from '@angular/forms';
import { Brand } from 'app/models/brand';
import { Color } from 'app/models/color';
import { BrandService } from 'app/services/brand/brand.service';
import { CarService } from 'app/services/car/car.service';
import { ColorService } from 'app/services/color/color.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.scss']
})
export class CarAddComponent implements OnInit {
  carAddForm:FormGroup;
  colors:Color[] = [];
  brands:Brand[] = [];

  constructor(
    private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService,
    private colorService:ColorService,
    private brandService:BrandService
  ) { }
  public contentHeader: object;

  ngOnInit(): void {
    this.careateCarAddForm();
    this.getBrands();
    this.getColors();

    this.contentHeader = {
      headerTitle: "Car Add",
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
            name: "Car Add",
            isLink: false,
          }
        ],
      },
    };
  }


  careateCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      carName:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    })
  }

  carAdd(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value)
      this.carService.addCar(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        setTimeout(() => {
          this.carAddForm.reset();
          window.location.href = "/cars"
        }, 3000);
      },errorResponse=>{
        if(errorResponse.error.Errors.length>0){
          for (let i = 0; i < errorResponse.error.Errors.length; i++) {
            this.toastrService.error(errorResponse.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
          }
        }
      })
    }
    else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
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
