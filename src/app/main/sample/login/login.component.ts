import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormControl,FormBuilder } from "@angular/forms";
import { CoreConfigService } from '@core/services/config.service';
import { AuthService } from 'app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup

  private _unsubscribeAll: Subject<any>;
  constructor(
    private _coreConfigService: CoreConfigService,
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService
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
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let authModel = Object.assign({},this.loginForm.value)
      this.authService.login(authModel).subscribe((response)=>{
        this.toastrService.success(response.message,"Başarılı",{toastClass: 'toast ngx-toastr'})
        setTimeout(() => {
          window.history.back()
        }, 3000);
        localStorage.setItem("token",response.data.token)
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
