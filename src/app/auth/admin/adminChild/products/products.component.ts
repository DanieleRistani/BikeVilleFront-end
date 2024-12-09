import { Component, OnInit } from '@angular/core';
import { NgIf,NgFor } from '@angular/common';
import { ProductsService } from '../../../../service/product/products.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

constructor(private productService: ProductsService){}

products !: any
showAddProducts : boolean = false

ngOnInit(): void {
    this.productService.getProductsIndex().subscribe((data: any) => {
      console.log(data);
      
      this.products=data.$values
    })
}

}
