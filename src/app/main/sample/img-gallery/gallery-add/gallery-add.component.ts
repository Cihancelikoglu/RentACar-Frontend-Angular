import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarImages } from 'app/models/carImage';
import { CarimageService } from 'app/services/carImages/carimage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gallery-add',
  templateUrl: './gallery-add.component.html',
  styleUrls: ['./gallery-add.component.scss']
})
export class GalleryAddComponent implements OnInit {
  imageAddForm: FormGroup

  constructor(
    private carImageService: CarimageService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
  ) { }
  public contentHeader: object;

  ngOnInit(): void {
    this.careateimageAddForm();

    this.contentHeader = {
      headerTitle: "Add Image",
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
            name: "Add Image",
            isLink: false,
          },
        ],
      },
    };
  }

  careateimageAddForm() {
    this.imageAddForm = this.formBuilder.group({
      file: ["", Validators.required],
    })
  }

  // on file select event
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = (event.target as HTMLInputElement).files[0];
      this.imageAddForm.patchValue({
        file: file
      });
    }
  }

  imageAdd() {
    if (this.imageAddForm.valid) {

      const formData = new FormData();
      formData.append('carId', this.router.snapshot.params.carId);
      formData.append('file', this.imageAddForm.get('file').value);

      this.carImageService.addImage(formData).subscribe(response => {
        this.toastrService.error(response.message,"Başarılı",{toastClass: 'toast ngx-toastr'})
        setTimeout(() => {
          window.location.href = "/cars/gallery/"+this.router.snapshot.params.carId
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

}
