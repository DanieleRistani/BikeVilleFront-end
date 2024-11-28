import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/auth/login.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  constructor(private loginService :LoginService,private route:ActivatedRoute) { }
  authUser : any
  jwtDecode :any
  ngOnInit(): void {
    this.jwtDecode=jwtDecode(localStorage.getItem('token')!)
    this.route.paramMap.subscribe((params: ParamMap) => {
      if(this.jwtDecode.unique_name != params.get('email')){
        this.loginService.runLogout()
      }else{
        this.loginService.getAuthUser(params.get('email')!).subscribe((data: any) => {
          this.authUser=data
        });
      }
    }); 
   
    
  }



}
