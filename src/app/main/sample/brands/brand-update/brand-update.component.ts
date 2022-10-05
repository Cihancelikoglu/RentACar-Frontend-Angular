import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl, Validators  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from 'app/services/brand/brand.service';
import { Brand } from 'app/models/brand';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.scss']
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm:FormGroup;
  brand:Brand;

  constructor(
    private brandService:BrandService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:ActivatedRoute,
  ) { }

  public contentHeader: object

  ngOnInit(): void {
    this.getByIdBrand();
    this.careateBrandUpdateForm();

    this.contentHeader = {
      headerTitle: 'Update Brands',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Anasayfa',
            isLink: true,
            link: '/'
          },
          {
            name: 'Brands',
            isLink: true,
            link: '/brands'
          },
          {
            name: 'Update Brands',
            isLink: false
          }
        ]
      }
    }
  }

  careateBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      brandName:[this.brand.brandName,Validators.required],
    })
  }

  brandUpdate() {
    if(this.brandUpdateForm.valid){
      let brandModel: Brand = { id: this.brand.id, ...this.brandUpdateForm.value };
      this.brandService.updateBrand(brandModel).subscribe(response=>{
        this.toastrService.success(response.message, "Başarılı", { toastClass: 'toast ngx-toastr' })
        setTimeout(() => {
          window.location.href = "/brands"
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

  getByIdBrand(){
    this.brandService.getByIdBrand(this.router.snapshot.params.brandId).subscribe((response:any)=>{
      this.brand = response.data;
      console.log(response)
      this.careateBrandUpdateForm();
    })
  }
}

