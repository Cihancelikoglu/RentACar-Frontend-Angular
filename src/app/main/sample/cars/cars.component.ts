import { Component, OnInit } from '@angular/core';
import { CarDetailDto } from 'app/models/carDetailDto';
import { CarService } from 'app/services/car/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  cars:CarDetailDto[] = [];

  constructor(private carService:CarService) { }

  public contentHeader: object

  /**
  * On init
  */
   ngOnInit() {
    this.getCars();
     this.contentHeader = {
       headerTitle: 'Cars',
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
             name: 'Cars',
             isLink: false
           }
         ]
       }
     }
   }
getCars(){
  this.carService.getCars().subscribe(response=>{
    this.cars=response.data;
  })
}
}
