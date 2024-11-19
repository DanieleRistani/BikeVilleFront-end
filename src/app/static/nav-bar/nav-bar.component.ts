import { Component,  OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { NgClass } from '@angular/common';
import { CategoriesService } from '../../service/category/categories.service';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink,FormsModule,NgClass,NgFor],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  
  
 constructor(private categoryService: CategoriesService) { }

  categories: any[]= [];
  show !:boolean;
  isNight: boolean = window.localStorage.getItem('isNight') == 'true' ? true : false
  search : string=""
  
  ngOnInit(): void {

    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data.$values.filter((item : any) => !item.$ref);  
    })


    this.show=false


    if( window.localStorage.getItem('isNight')){
      
    }else{
      window.localStorage.setItem('isNight', 'false')
    }

    if(window.localStorage.getItem('isNight') == 'true'){
      document.body.classList.add('night-mode');
      document.body.classList.remove('light-mode');
    }else{
      document.body.classList.remove('night-mode');
      document.body.classList.add('light-mode');
    }
   

  }
 
  turnOnNightMode() {
    if (this.isNight == false) {
      window.localStorage.setItem('isNight', 'true')
      document.body.classList.add('night-mode');
      document.body.classList.remove('light-mode');
    }
    else {
      window.localStorage.setItem('isNight', 'false')
      document.body.classList.remove('night-mode');
      document.body.classList.add('light-mode');
    }
  }

  isShow(){
    if(this.show==true){
      this.show=false
    }
  }


}
