import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from 'app/services/brand/brand.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.scss']
})
export class BrandAddComponent implements OnInit {
  brandAddForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private brandService:BrandService,
  ) { }
  public contentHeader: object;

  ngOnInit(): void {
    this.careateBrandAddForm();

    this.contentHeader = {
      headerTitle: "Brand Add",
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
            name: "Brand Add",
            isLink: false,
          }
        ],
      },
    };
  }

  careateBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      brandName:["",Validators.required],
    })
  }

  brandAdd(){
    if(this.brandAddForm.valid){
      let brandModel = Object.assign({},this.brandAddForm.value)
      this.brandService.addBrand(brandModel).subscribe(response=>{
        console.log(brandModel)
        this.toastrService.success(response.message,"Başarılı")
        setTimeout(() => {
          this.brandAddForm.reset();
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
  
}
