import { Component, OnInit } from '@angular/core';
import { Brand } from 'app/models/brand';
import { BrandService } from 'app/services/brand/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brands: Brand[] = [];
  dataLoaded = false;
  filterText="";

  constructor(private brandService:BrandService) { }

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
}
