import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../service/category/categories.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NgFor],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoriesService, private route: ActivatedRoute) { }
  category!: any
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.getCategory(Number(params.get('id')));
    });
  }

  getCategory(id: number) {
    return this.categoryService.getCategory(id).subscribe(data => {
      this.category = data;
      console.log(this.category);
    });
  }
}
