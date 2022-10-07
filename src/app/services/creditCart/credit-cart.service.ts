import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditCart } from 'app/models/creditCart';

@Injectable({
  providedIn: 'root'
})
export class CreditCartService {
  apiUrl = "https://demotakipet.website";
  constructor(private httpClient:HttpClient) { }


  peymentControl(rental:CreditCart){
    let newPath = this.apiUrl + "/api/creditcards/creditcartcontrol";
    return this.httpClient.post(newPath,rental);
  }
}
