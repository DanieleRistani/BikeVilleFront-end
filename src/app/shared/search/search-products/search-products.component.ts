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

productsFiltered: any
products:any[]=[]
ngOnInit(): void {    
  this.route.paramMap.subscribe((params: ParamMap) => {
    this.getProductsByFilter(params.get('filter')!);
  });  
}
getProductsByFilter(filter: string){
  console.log(filter);
  this.getProducts();
  console.log(this.products);
  this.productsFiltered=this.products.filter((product: any) => product.name.toLowerCase().includes(filter.toLowerCase()));
  console.log(this.productsFiltered);
  
  
}



getProducts(){   
  this.productService.getProducts().subscribe((data: any) => {data.$values.filter((cat :any) => !cat.$ref).forEach((category: any) => {category.inverseParentProductCategory.$values.forEach((category: any) => {category.products.$values.forEach((product: any) => {this.products.push(product)})})})});
 
}
}


