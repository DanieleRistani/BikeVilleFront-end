import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../service/product/products.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-search-products',
  standalone: true,
  imports: [FormsModule,NgFor],
  templateUrl: './search-products.component.html',
  styleUrl: './search-products.component.css'
})
export class SearchProductsComponent implements OnInit {
constructor(private productService: ProductsService,private route: ActivatedRoute){}


productsFiltered : any

ngOnInit(): void {  
  
  this.route.paramMap.subscribe((params: ParamMap) => {
    this.getProducts(params.get('filter')!)
  });  

 
  
}
getProducts(filter : string) {
  this.productService.getProducts(filter).subscribe((data: any) => {
    console.log(data);
    this.productsFiltered=data.$values
  })
}







}


