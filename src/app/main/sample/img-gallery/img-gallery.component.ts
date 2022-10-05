import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImages } from 'app/models/carImage';
import { CarimageService } from 'app/services/carImages/carimage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-img-gallery',
  templateUrl: './img-gallery.component.html',
  styleUrls: ['./img-gallery.component.scss']
})
export class ImgGalleryComponent implements OnInit {
  carImages: CarImages[] = [];
  baseImageUrl = "https://localhost:44330/Uploads/Images/"
  carIdUrl:number;

  constructor(
    private carImageService:CarimageService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService
  ) { }
  public contentHeader: object;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["carId"]) {
        this.getByCarImageId(params["carId"]);
      } else {
        
      }
    });

    this.contentHeader = {
      headerTitle: "Image Gallery",
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
            name: "Image Gallery",
            isLink: false,
          },
        ],
      },
    };
  }

  getByCarImageId(carId: number) {
    this.carIdUrl=carId;
    this.carImageService.getByCarImageId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  getCarImages() {
    this.carImageService.getCarImages().subscribe((response) => {
      this.carImages = response.data;
    });
  }

  delete(carImage:CarImages){
    if (window.confirm("Silmek istediğinizden emin misiniz?")) {
      this.deleteImage(carImage)
    }
  }

  deleteImage(carImage:CarImages){
    this.carImageService.deleteImage(carImage).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı",{toastClass: 'toast ngx-toastr'})
      setTimeout(() => {
        window.location.href = "/cars/gallery/"+carImage.carId
      }, 2000);
    })
  }
}
