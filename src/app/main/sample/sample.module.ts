import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { HomeComponent } from './home/home.component';
import { CarsComponent } from './cars/cars.component';
import { BrandsComponent } from './brands/brands.component';
import { CustomerComponent } from './customer/customer.component';
import { ColorComponent } from './color/color.component';
import { RentalsComponent } from './rentals/rentals.component';

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
  }
];

@NgModule({
  declarations: [HomeComponent, CarsComponent, BrandsComponent, CustomerComponent, ColorComponent, RentalsComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule],
  exports: [HomeComponent]
})
export class SampleModule {}
