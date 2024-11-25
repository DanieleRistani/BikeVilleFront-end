import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../service/category/categories.service';
import { NgFor} from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  constructor(private categoryService: CategoriesService) { }
  categories: any[]= [];
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: any) => {
    this.categories = data.$values.filter((item : any) => !item.$ref); 

    })
   
           
  }

  

}
