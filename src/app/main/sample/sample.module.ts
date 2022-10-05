import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { HomeComponent } from './home/home.component';
import { CarsComponent } from './cars/cars.component';
import { BrandsComponent } from './brands/brands.component';
import { CustomerComponent } from './customer/customer.component';
import { ColorComponent } from './color/color.component';
import { RentalsComponent } from './rentals/rentals.component';
import { SwiperModule } from "swiper/angular";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterBrandPipe } from '../../pipes/filter-brand.pipe';
import { FilterCarPipe } from 'app/pipes/filter-car.pipe';
import { FilterColorPipe } from 'app/pipes/filter-color.pipe';
import { ToastrModule } from 'ngx-toastr';
import { RentalAddComponent } from './rental/rental-add/rental-add.component';
import { RentalDateControlComponent } from './rental/rental-date-control/rental-date-control.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CarAddComponent } from './cars/car-add/car-add.component';
import { ColorAddComponent } from './color/color-add/color-add.component';
import { BrandAddComponent } from './brands/brand-add/brand-add.component';
import { RentalComponent } from './rental/rental.component';
import { RentalDetailComponent } from './rental/rental-detail/rental-detail.component';
import { CarUpdateComponent } from './cars/car-update/car-update.component';
import { ColorUpdateComponent } from './color/color-update/color-update.component';
import { BrandUpdateComponent } from './brands/brand-update/brand-update.component';
import { SplitPipe } from 'app/pipes/split.pipe';
import { ImgGalleryComponent } from './img-gallery/img-gallery.component';
import { GalleryAddComponent } from './img-gallery/gallery-add/gallery-add.component';
import { GalleryUpdateComponent } from './img-gallery/gallery-update/gallery-update.component';

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
  {
    path: 'rental',
    component: RentalComponent,
    data: { animation: 'rental' }
  },
  { path: "rental/rentaldetail/:carId", component: RentalDetailComponent },
  { path: "rental/color/:colorId", component: RentalComponent },
  { path: "rental/brand/:brandId", component: RentalComponent },
  { path: "rental/:carId", component: RentalAddComponent },

  { path: "cars/addcar", component: CarAddComponent },
  { path: "cars/update/:carId", component: CarUpdateComponent },
  { path: "cars/gallery/:carId", component: ImgGalleryComponent },
  { path: "cars/galleryadd/:carId", component: GalleryAddComponent },
  { path: "cars/galleryupdate/:id", component: GalleryUpdateComponent },
  
  { path: "colors/addcolor", component: ColorAddComponent },
  { path: "colors/update/:colorId", component: ColorUpdateComponent },

  { path: "brands/addbrand", component: BrandAddComponent },
  { path: "brands/update/:brandId", component: BrandUpdateComponent },

];

@NgModule({
  declarations: [
    HomeComponent,
    CarsComponent,
    BrandsComponent,
    CustomerComponent,
    ColorComponent,
    RentalsComponent,
    FilterBrandPipe,
    FilterCarPipe,
    FilterColorPipe,
    SplitPipe,
    RentalAddComponent,
    RentalDateControlComponent,
    CarAddComponent,
    ColorAddComponent,
    BrandAddComponent,
    RentalComponent,
    RentalDetailComponent,
    CarUpdateComponent,
    ColorUpdateComponent,
    BrandUpdateComponent,
    ImgGalleryComponent,
    GalleryAddComponent,
    GalleryUpdateComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule, SwiperModule, NgbModule, FormsModule, BrowserAnimationsModule,
  NgxMaskModule.forRoot(),
  ToastrModule.forRoot()
  ],
  exports: [HomeComponent]
})
export class SampleModule { }
