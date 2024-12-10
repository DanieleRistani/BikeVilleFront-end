import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriesService } from '../category/categories.service';
import { Product } from '../../Entity/Product';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private categoryService: CategoriesService) { }

  getProducts(filter : string) {
    return this.http.get('https://localhost:7167/Products/Filter/'+filter);
  }
  getProductsIndex(){
    return this.http.get('https://localhost:7167/Products/Index')
  }
  deleteProductById(id : number) {
    return this.http.delete('https://localhost:7167/Products/Delete/'+id)
  }
  getModels() {
     return this.http.get("https://localhost:7167/ProductModels/Index");
  }

  addProduct(product :Product){
    return this.http.post("https://localhost:7167/Products/Add",product)
  }
}
