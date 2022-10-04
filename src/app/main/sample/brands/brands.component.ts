import { Component, OnInit } from '@angular/core';
import { Brand } from 'app/models/brand';
import { BrandService } from 'app/services/brand/brand.service';
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
    private toastrService:ToastrService
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
      if (window.confirm("Silmek istediğinizden emin misiniz?")) {
        this.brandDelete(brand)
      }
    }

    brandDelete(brand:Brand){
      this.brandService.deleteBrand(brand).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        setTimeout(() => {
          window.location.href = "/brands"
        }, 2000);
      })
    }
}
