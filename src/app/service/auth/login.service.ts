import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from '../../Entity/Credentials';
import { Observable } from 'rxjs';
import { AuthUser } from '../../Entity/AuthUser';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class LoginService{

  constructor(private http :HttpClient) { }
 
  
  headersAuth = new HttpHeaders({
    'Content-Type': 'application/json',
    responseType: 'text',
  });

 

  authUser : AuthUser={name:"",email:"",role:""}
  jwtToken :string=""



  loginPost(credentials: Credentials): Observable<any> {
    return this.http.post('https://localhost:7167/LoginJwt/Login', credentials, {
      observe: 'response',
    });
  }

  runLogout(){
    this.authUser={name:"",email:"",role:""}
    
    localStorage.removeItem("token")
    this.headersAuth= this.headersAuth = new HttpHeaders({
      'Content-Type': 'application/json',
      responseType: 'text',
    });
  }
  setHeaderTokenAuth(token:string){
    this.jwtToken=token
    this.headersAuth=this.headersAuth.set('Authorization', 'Bearer ' + token)
    console.log(this.jwtToken);
    console.log(this.headersAuth);

  }
}
 
