import { Component, OnInit } from '@angular/core';
import { Brand } from 'app/models/brand';
import { BrandService } from 'app/services/brand/brand.service';
import { LocalStorageService } from 'app/services/localStorage/local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brands: Brand[] = [];
  dataLoaded = false;
  filterText="";

  constructor(
    private brandService:BrandService,
    private toastrService:ToastrService,
    private localStorage:LocalStorageService
    ) { }

  public contentHeader: object

   /**
   * On init
   */
    ngOnInit() {
      this.getBrands();
      this.contentHeader = {
        headerTitle: 'Brands',
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
              isLink: false
            }
          ]
        }
      }
    }

    getBrands() {
      this.brandService.getBrands().subscribe(response=>{
        this.brands = response.data;
        this.dataLoaded = true;
      })
    }

    delete(brand:Brand){
      if(this.localStorage.getLocalStorage('token')){
        if (window.confirm("Silmek istediğinizden emin misiniz?")) {
          this.brandDelete(brand)
        }
      }
     else{
      this.toastrService.error("Sisteme Giriş Yapmalısınız","Başarısız",{toastClass: 'toast ngx-toastr'})
     }
    }

    brandDelete(brand:Brand){
      this.brandService.deleteBrand(brand).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı",{toastClass: 'toast ngx-toastr'})
        setTimeout(() => {
          window.location.href = "/brands"
        }, 2000);
      })
    }
}
