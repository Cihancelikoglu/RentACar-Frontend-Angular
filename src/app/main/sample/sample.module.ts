import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { HomeComponent } from './home/home.component';
import { CarsComponent } from './cars/cars.component';
import { BrandsComponent } from './brands/brands.component';
import { CustomerComponent } from './customer/customer.component';
import { ColorComponent } from './color/color.component';
import { RentalsComponent } from './rentals/rentals.component';
import { CarDetailComponent } from './cars/carDetail/car-detail/car-detail.component';
import { SwiperModule } from "swiper/angular";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterBrandPipe } from '../../pipes/filter-brand.pipe';
import { FilterCarPipe } from 'app/pipes/filter-car.pipe';
import { FilterColorPipe } from 'app/pipes/filter-color.pipe';
import { ToastrModule } from 'ngx-toastr';
import { RentalAddComponent } from './rentals/rental-add/rental-add.component';
import { RentalDateControlComponent } from './rentals/rental-date-control/rental-date-control.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CarAddComponent } from './cars/car-add/car-add.component';
import { ColorAddComponent } from './color/color-add/color-add.component';
import { BrandAddComponent } from './brands/brand-add/brand-add.component';

const routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'home' }
  },
  {
    path: 'brands',
    component: BrandsComponent,
    data: { animation: 'brands' }
  },
  {
    path: 'colors',
    component: ColorComponent,
    data: { animation: 'colors' }
  },
  {
    path: 'customers',
    component: CustomerComponent,
    data: { animation: 'customers' }
  },
  {
    path: 'rentals',
    component: RentalsComponent,
    data: { animation: 'rentals' }
  },
  {
    path: 'cars',
    component: CarsComponent,
    data: { animation: 'cars' }
  },
  {path:"cars/color/:colorId", component:CarsComponent},
  {path:"cars/brand/:brandId", component:CarsComponent},
  {path:"cars/cardetail/:carId", component:CarDetailComponent},
  {path:"cars/rental/:carId", component:RentalAddComponent},
  {path:"cars/addcar", component:CarAddComponent},
  {path:"colors/addcolor", component:ColorAddComponent},
  {path:"brands/addbrand", component:BrandAddComponent}
];

@NgModule({
  declarations: [HomeComponent, CarsComponent, BrandsComponent, CustomerComponent, ColorComponent, RentalsComponent, CarDetailComponent ,FilterBrandPipe,FilterCarPipe,FilterColorPipe, RentalAddComponent, RentalDateControlComponent,CarAddComponent, ColorAddComponent, BrandAddComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule,SwiperModule,NgbModule,FormsModule,BrowserAnimationsModule,
  NgxMaskModule.forRoot(),
    ToastrModule.forRoot()
  ],
  exports: [HomeComponent]
})
export class SampleModule {}
