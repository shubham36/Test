import {AfterViewInit,OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CustomerService } from '../service/customer.service';
import { Customer } from './customer';
import { Router } from '@angular/router';
import { OrdersService } from '../service/orders.service';

@Component({
  selector: 'app-customers',
     templateUrl: './customers.component.html',
     styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] =['id', 'companyName', 'contactName', 'contactTitle', 'address', 'city','postalCode','country','phone','fax','region','orders'];

 public dataSource = new MatTableDataSource<Customer>();
  data;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private customerService:CustomerService,private router: Router,private ordersService:OrdersService ) {
    
  }
  ngOnInit() {
        this.getAllCustomers();
      }
    
      public getAllCustomers() {
        this.customerService.getData()
        .then(res => {
          
          this.data = JSON.stringify(res)
         
          this.dataSource.data = JSON.parse(this.data).customers
          
        })
       
      }
  ngAfterViewInit() {
    console.log(this.dataSource.data)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getOrders(id:string){
    console.log(id)

    this.ordersService.getOrders(id).then(res => {
          
      let data = JSON.stringify(res)
     
      this.ordersService.orders = JSON.parse(data)
      
    })

    this.router.navigate(['/orders', { id: id }])
  }

}

