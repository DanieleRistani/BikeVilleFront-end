import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../service/category/categories.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  constructor(private categoryService: CategoriesService) { }
  categories: any;
  ngOnInit(): void {
    //   this.categoryService.getCategories().subscribe((data: any) => {
    //   console.log(data);
    //   this.categories=Object.keys(data).map((key) =>{return data[key]});
    //   console.log(this.categories[1]);
    // })
           
  }

}
