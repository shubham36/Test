import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { OrdersService } from '../service/orders.service';
import { ActivatedRoute } from '@angular/router';


export interface Orders{
  
            order: [{
               "id": Number,
               "customerId": string,
               "employeeId": Number,
               "orderDate": string,
               "requiredDate": string,
               "shippedDate": string,
               "shipVia": Number,
               "freight": Number,
               "shipName":string,
               "shipAddress": string,
               "shipCity": string,
               "shipPostalCode": string,
               "shipCountry": string
            }],
            orderDetails: [
               {
                  "orderId": Number,
                  "productId": Number,
                  "unitPrice": Number,
                  "quantity": Number,
                  "discount": Number
               }
            ]
         
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
//  displayedColumns: string[] =['order', 'orderDetails'];
displayedColumns: string[] =['order','orderDesp', 'orderDetails','order_details'];

  public dataSource = new MatTableDataSource<Orders>();
  data;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderService:OrdersService,private route: ActivatedRoute) {
    
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.orderService.getOrders(id).then(res => {
          
      let data1 = JSON.stringify(res)
     console.log(JSON.parse(data1).results)
     this.dataSource = JSON.parse(data1).results
     
    })
  
    
    //console.log("this.dataSource.data"+this.data.results)
  }

  ngAfterViewInit() {
   
    // console.log(this.dataSource.data)
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
 }

}
