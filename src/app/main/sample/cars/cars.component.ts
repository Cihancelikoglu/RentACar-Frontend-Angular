import { Component, OnInit } from "@angular/core";
import { Brand } from "app/models/brand";
import { Car } from "app/models/car";
import { CarDetailDto } from "app/models/carDetailDto";
import { Color } from "app/models/color";
import { CarService } from "app/services/car/car.service";
import { LocalStorageService } from "app/services/localStorage/local-storage.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-cars",
  templateUrl: "./cars.component.html",
  styleUrls: ["./cars.component.scss"],
})
export class CarsComponent implements OnInit {
  cars: CarDetailDto[] = [];
  colors: Color[] = [];
  brands: Brand[] = [];
  baseImageUrl = "https://demotakipet.website/Uploads/Images/"
  filterText="";

  constructor(
    private carService: CarService,
    private toastrService:ToastrService,
    private localStorage:LocalStorageService
  ) {}
  public contentHeader: object;

  /**
   * On init
   */
  ngOnInit() {
    this.getCars();
    this.contentHeader = {
      headerTitle: "Cars",
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
            isLink: false,
          },
        ],
      },
    };
  }
  
  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  delete(car:Car){
    if(this.localStorage.getLocalStorage('token')){
      if (window.confirm("Silmek istediğinizden emin misiniz?")) {
        this.carDelete(car)
      }
    }
   else{
    this.toastrService.error("Sisteme Giriş Yapmalısınız","Başarısız",{toastClass: 'toast ngx-toastr'})
   }
  }

  carDelete(car:Car){
    this.carService.deleteCar(car).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı",{toastClass: 'toast ngx-toastr'})
      setTimeout(() => {
        window.location.href = "/cars"
      }, 2000);
    })
  }

}
