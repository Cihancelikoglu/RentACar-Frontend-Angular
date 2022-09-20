import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'app/models/carDetailDto';
import { CarImages } from 'app/models/carImage';
import { CarDetailService } from 'app/services/carDetail/car-detail.service';
import { CarimageService } from 'app/services/carImages/carimage.service';

import { BehaviorSubject } from 'rxjs';
import SwiperCore, { Keyboard, Pagination, Navigation, Virtual } from 'swiper';
SwiperCore.use([Keyboard, Pagination, Navigation, Virtual]);


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarDetailComponent implements OnInit {
  carDetails:CarDetailDto[]=[];
  carImages:CarImages[]=[];
  baseImageUrl = "https://localhost:44330/Uploads/Images/"


  constructor(private carDetailService: CarDetailService,private carImageService:CarimageService,private activatedRoute: ActivatedRoute) { }
  public contentHeader: object;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["carId"]) {
        this.getCarDetails(params["carId"]);
        this.getByCarImageId(params["carId"]);
      } else {
        this.getCarImages();
      }
    });

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

  getCarDetails(carId:number) {
    this.carDetailService.getCarDetails(carId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getByCarImageId(carId:number) {
    this.carImageService.getByCarImageId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  getCarImages() {
    this.carImageService.getCarImages().subscribe((response) => {
      this.carImages = response.data;
    });
  }
  
}
