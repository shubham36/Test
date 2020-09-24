import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url = "http://northwind.netcore.io/customers"
  constructor(private http : HttpClient) { }


 async getData(){
  return await this.http.get(this.url).toPromise()
  }
}
