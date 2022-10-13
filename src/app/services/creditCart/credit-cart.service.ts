import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditCart } from 'app/models/creditCart';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditCartService {

  constructor(private httpClient:HttpClient) { }


  peymentControl(rental:CreditCart){
    let newPath = environment.apiUrl + "/creditcards/creditcartcontrol";
    return this.httpClient.post(newPath,rental);
  }
}
