import { Component, OnInit,  } from '@angular/core';
import {  NavigationStart, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { NgClass } from '@angular/common';
import { CategoriesService } from '../../service/category/categories.service';
import { NgFor } from '@angular/common';
import { LoginService } from '../../service/auth/login.service';
import { NgIf } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink,FormsModule,NgClass,NgFor,NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  
  isAuth!:Boolean 
  categories: any[]= [];
  show !:boolean;
  isNight: boolean = window.localStorage.getItem('isNight') == 'true' ? true : false
  search !: string
  authUser : any
  jwtDecode :any
  countCartProduct !: number
  
 constructor(private categoryService: CategoriesService,private loginService: LoginService,private router: Router) {
  
  this.router.events.subscribe((event) => {
    
    if (event instanceof NavigationStart) {
   
     
     
      if (localStorage.getItem('token')) {
         

        if(localStorage.getItem('token') && !this.loginService.checkValidToken(localStorage.getItem('token')||'') ){
          this.logout()
          this.isAuth=false
          this.authUser=null
          window.location.replace('/');
        }
      }
    }
  });

  }

  


  ngOnInit(): void {

    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data.$values.filter((item : any) => !item.$ref);   
    })

    this.isAuth=localStorage.getItem('token') ? true : false
    
    this.countCartProduct=localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')||'').length : 0

    if(this.isAuth){
      this.jwtDecode=jwtDecode(localStorage.getItem('token')||'')
      this.loginService.getAuthUser(this.jwtDecode.unique_name).subscribe((data: any) => {
        this.authUser=data
      });
    }


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

  logout(){
    this.isShow()
    this.loginService.runLogout()
   
    
  }

}

