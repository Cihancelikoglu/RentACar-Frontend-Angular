import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormControl,FormBuilder } from "@angular/forms";
import { CoreConfigService } from '@core/services/config.service';
import { Findex } from 'app/models/findex';
import { User } from 'app/models/user';
import { AuthService } from 'app/services/auth/auth.service';
import { LocalStorageService } from 'app/services/localStorage/local-storage.service';
import { UserService } from 'app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;

  private _unsubscribeAll: Subject<any>;
  constructor(
    private _coreConfigService: CoreConfigService,
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private localStorage:LocalStorageService,
    private userService:UserService

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

        this.getUser()
        this.setLocalEmail()
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

  setLocalEmail(){
    this.localStorage.addLocalStorage('AccountMail',(this.loginForm.get('email').value))
  }

  getUser(){
    this.userService.getByUser((this.loginForm.get('email').value)).subscribe((response)=>{
      this.localStorage.addLocalStorage('Account',JSON.stringify(response.data.id))
    })
  }
}
