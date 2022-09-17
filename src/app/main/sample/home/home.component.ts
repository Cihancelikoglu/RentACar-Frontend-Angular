import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() {}

  public contentHeader: object

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.contentHeader = {
      headerTitle: 'Rent A Car',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Anasayfa',
            isLink: true,
            link: '/'
          },
        ]
      }
    }
  }
}
