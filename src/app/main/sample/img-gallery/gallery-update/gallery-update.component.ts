import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarImages } from 'app/models/carImage';
import { CarimageService } from 'app/services/carImages/carimage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gallery-update',
  templateUrl: './gallery-update.component.html',
  styleUrls: ['./gallery-update.component.scss']
})
export class GalleryUpdateComponent implements OnInit {
  imageUpdateForm: FormGroup
  carImage: CarImages;
  carIdd: number
  baseImageUrl = "https://demotakipet.website/Uploads/Images/"

  constructor(
    private carImageService: CarimageService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
  ) { }
  public contentHeader: object;

  ngOnInit(): void {
    this.careateImageUpdateForm();
    this.getByIdImage();

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

  careateImageUpdateForm() {
    this.imageUpdateForm = this.formBuilder.group({
      file: ["", Validators.required],
    })
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = (event.target as HTMLInputElement).files[0];
      this.imageUpdateForm.patchValue({
        file: file
      });
    }
  }

  imageUpdate() {
    if (this.imageUpdateForm.valid) {
      const formData = new FormData();
      formData.append('id', this.router.snapshot.params.id);
      formData.append('carId', (this.carIdd.toString()));
      formData.append('file', this.imageUpdateForm.get('file').value);

      this.carImageService.updateImage(formData).subscribe(response => {
        this.toastrService.success(response.message, "Başarılı", { toastClass: 'toast ngx-toastr' })
        setTimeout(() => {
          window.location.href = "/cars/gallery/" + this.carIdd
        }, 3000);
      }, errorResponse => {
        if (errorResponse.error.Errors) {
          if (errorResponse.error.Errors.length > 0) {
            for (let i = 0; i < errorResponse.error.Errors.length; i++) {
              this.toastrService.error(errorResponse.error.Errors[i].ErrorMessage, "Doğrulama Hatası", { toastClass: 'toast ngx-toastr' })
            }
          }
        }
        else {
          this.toastrService.error(errorResponse.error.message, "Doğrulama Hatası", { toastClass: 'toast ngx-toastr' })
        }
      })
    }
    else {
      this.toastrService.error("Formunuz Eksik", "Dikkat")
    }
  }

  getByIdImage() {
    this.carImageService.getByImageId(this.router.snapshot.params.id).subscribe((response: any) => {
      this.carImage = response.data;
      this.carIdd = this.carImage.carId
      this.careateImageUpdateForm();
    })
  }


}
