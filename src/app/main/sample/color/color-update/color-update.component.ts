import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl, Validators  } from '@angular/forms';
import { Color } from 'app/models/color';
import { ColorService } from 'app/services/color/color.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.scss']
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm:FormGroup;
  color:Color;

  constructor(
    private colorService:ColorService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:ActivatedRoute,
  ) { }

  public contentHeader: object

  ngOnInit(): void {
    this.getByIdColor();
    this.careateColorUpdateForm();
    console.log(this.router.snapshot.params.colorId)

    this.contentHeader = {
      headerTitle: 'Colors',
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
            name: 'Colors',
            isLink: false
          }
        ]
      }
    }
  }

  careateColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorName:[this.color.colorName,Validators.required],
    })
  }

  colorUpdate() {
    if(this.colorUpdateForm.valid){
      let colorModel: Color = { id: this.color.id, ...this.colorUpdateForm.value };
      this.colorService.updateCar(colorModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        setTimeout(() => {
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

  getByIdColor(){
    this.colorService.getByIdColor(this.router.snapshot.params.colorId).subscribe((response:any)=>{
      this.color = response.data;
      console.log(response)
      this.careateColorUpdateForm();
    })
  }
}

