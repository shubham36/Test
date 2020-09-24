import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  orders
  url = "http://northwind.netcore.io/customers/"
  constructor(private http : HttpClient) { }

  async getOrders(id){
    return await this.http.get(this.url+id+"/orders").toPromise()
  }
}
