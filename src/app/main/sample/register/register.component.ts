import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreConfigService } from '@core/services/config.service';
import { RegisterModel } from 'app/models/registerModel';
import { AuthService } from 'app/services/auth/auth.service';
import { LocalStorageService } from 'app/services/localStorage/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;


  private _unsubscribeAll: Subject<any>;
  constructor(
    private _coreConfigService: CoreConfigService,
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private localStorage:LocalStorageService,
  ) { 

    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  register(){
    if(this.registerForm.valid){
      let authModel = Object.assign({},this.registerForm.value)
      console.log(authModel)
      this.authService.register(authModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı",{toastClass: 'toast ngx-toastr'})

        setTimeout(() => {
          window.location.href = "/login"
        }, 3000);
      },errorResponse=>{
        this.toastrService.success(errorResponse.error,"Hata",{toastClass: 'toast ngx-toastr'})
      })
    }
    else {
      this.toastrService.error("Eksik Alanları Doldurunuz", "Dikkat", {
        toastClass: 'toast ngx-toastr',
        closeButton: true
      })
    }
  }

}
