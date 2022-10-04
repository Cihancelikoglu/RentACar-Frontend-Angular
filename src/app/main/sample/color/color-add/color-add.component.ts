import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColorService } from 'app/services/color/color.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.scss']
})
export class ColorAddComponent implements OnInit {
  colorAddForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private colorService:ColorService,
  ) { }
  public contentHeader: object;

  ngOnInit(): void {
    this.careateColorAddForm();

    this.contentHeader = {
      headerTitle: "Color Add",
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
            name: "Color Add",
            isLink: false,
          }
        ],
      },
    };
  }

  careateColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName:["",Validators.required],
    })
  }

  colorAdd(){
    if(this.colorAddForm.valid){
      let colorModel = Object.assign({},this.colorAddForm.value)
      this.colorService.addColor(colorModel).subscribe(response=>{
        console.log(colorModel)
        this.toastrService.success(response.message,"Başarılı")
        setTimeout(() => {
          this.colorAddForm.reset();
          window.location.href = "/colors"
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
