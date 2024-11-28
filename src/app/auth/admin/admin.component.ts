import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/auth/login.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

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
