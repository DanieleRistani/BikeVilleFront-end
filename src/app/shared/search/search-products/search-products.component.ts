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

filter : string='';
productsFiltered: any[]=[]
products:any[]=[]
ngOnInit(): void {  
  this.getProducts(); 
  this.route.paramMap.subscribe((params: ParamMap) => {
    // this.getProductsByFilter(params.get('filter')!);
    this.filter=params.get('filter')!
  });  
 
  
}

getProductsByFilter(){
  
  this.productsFiltered=this.products.filter((product: any) =>product.name.toLowerCase().includes(this.filter.toLowerCase()));
  console.log(this.filter);
  console.log(this.products);
  console.log(this.productsFiltered);

}




getProducts(){   
   this.products=[]
   this.productService.getProducts().subscribe((data: any) => {data.$values.filter((cat :any) => !cat.$ref).forEach((category: any) => {category.inverseParentProductCategory.$values.forEach((category: any) => {category.products.$values.forEach((product: any) => {this.products.push(product)})})})});
 }
}


