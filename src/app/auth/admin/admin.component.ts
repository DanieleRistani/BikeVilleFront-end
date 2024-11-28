import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/auth/login.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { FormsModule} from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule,NgIf,RouterOutlet,RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  constructor(private loginService :LoginService,private route:ActivatedRoute) { }
  authUser : any
  jwtDecode :any
  isClose !: boolean
  ngOnInit(): void {
    this.isClose=false
    this.jwtDecode=jwtDecode(localStorage.getItem('token')!)
    this.route.paramMap.subscribe((params: ParamMap) => {
      if(this.jwtDecode.unique_name != params.get('email') || this.jwtDecode.role != 'ADMIN'){
        
      }else{
        this.loginService.getAuthUser(params.get('email')!).subscribe((data: any) => {
          this.authUser=data
        });
      }
    }); 
   
    
  }

}
