import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriesService } from '../category/categories.service';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private categoryService: CategoriesService) { }

  getProducts() {
    return this.categoryService.getCategories();
  }
}
