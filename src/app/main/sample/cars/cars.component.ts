import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Brand } from "app/models/brand";
import { CarDetailDto } from "app/models/carDetailDto";
import { Color } from "app/models/color";
import { BrandService } from "app/services/brand/brand.service";
import { CarService } from "app/services/car/car.service";
import { ColorService } from "app/services/color/color.service";

@Component({
  selector: "app-cars",
  templateUrl: "./cars.component.html",
  styleUrls: ["./cars.component.scss"],
})
export class CarsComponent implements OnInit {
  cars: CarDetailDto[] = [];
  colors: Color[] = [];
  brands: Brand[] = [];

  currentBrand:Brand;
  currentColor:Color;

  constructor(
    private carService: CarService,
    private brandService:BrandService,
    private colorService:ColorService,
    private activatedRoute: ActivatedRoute
  ) {}
  public contentHeader: object;

  /**
   * On init
   */
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params["colorId"]) {
        this.getCarsByColor(params["colorId"]);
      } else if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"]);
      } else {
        this.getCars();
      }
    });
    this.getBrands();
    this.getColors();
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

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
    });
  }
  
  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
  }

  setCurrentColor(color:Color){
    this.currentColor = color;
  }

  getCurrentColorClass(color:Color){
    if(color == this.currentColor){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }
  getCurrentBrandClass(brand:Brand){
    if(brand == this.currentBrand){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }
}
