import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
  
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return  this.http.get('https://localhost:7167/ProductCategories/Index');
  }
  getCategory(id: number) {
    return this.http.get('https://localhost:7167/ProductCategories/Details/' + id);
  }
}
