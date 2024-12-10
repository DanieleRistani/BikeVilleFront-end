import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../service/admin/admin.service';
import { NgFor,NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {


constructor(private adminService : AdminService,private notify: ToastrService) { }


customers!: any;
salesOrders!: any;
showSalesOrders : boolean = false
ngOnInit(): void {
  this.loadCustomers();
}

loadCustomers() {
  return this.adminService.getCustomers().subscribe((data: any) => {
    console.log(data);  
    this.customers = data.$values;
  });
}
deleteCustomer(id : number) {
  return this.adminService.deleteCustomerById(id).subscribe((data: any) => {
    console.log(data);
    this.notify.success('Customer deleted');
   
  });
}
getCustomerSalesOrders(id:number){
  this.adminService.getCustomerById(id).subscribe((data: any) => {
    console.log(data.salesOrderHeaders.$values);
    this.salesOrders = data.salesOrderHeaders.$values
  })
  this.showSalesOrders = true
}
}
