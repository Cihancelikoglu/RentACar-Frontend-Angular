import { Component, OnInit } from '@angular/core';
import { Color } from 'app/models/color';
import { ColorService } from 'app/services/color/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  dataLoaded = false;
  filterText="";

  constructor(private colorService:ColorService) { }

  public contentHeader: object

  /**
  * On init
  */
   ngOnInit() {
    this.getColors();
     this.contentHeader = {
       headerTitle: 'Colors',
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
             name: 'Colors',
             isLink: false
           }
         ]
       }
     }
   }

   getColors() {
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
      this.dataLoaded = true;
    })
  }

}
