import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from '../../Entity/Credentials';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  constructor(private http :HttpClient) {
 
  }
 
  jwtToken!: string 
  isAuth!:Boolean
  headersAuth = new HttpHeaders({
    'Content-Type': 'application/json',
    responseType: 'text',
  });


 checkValidToken(token: string) {
  const exp=jwtDecode(token).exp||0;
  if(exp > Math.floor(Date.now() / 1000)){
   return true
  }else{
    return false
  }
 }
 

  loginPost(credentials: Credentials): Observable<any> {
    return this.http.post('https://localhost:7167/LoginJwt/Login', credentials, {
      observe: 'response',
    });
  }

  runLogout(){
    localStorage.removeItem("token")
    this.headersAuth= this.headersAuth = new HttpHeaders({
      'Content-Type': 'application/json',
      responseType: 'text',
    });
  }
  setHeaderTokenAuth(token:string){
    this.headersAuth=this.headersAuth.set('Authorization', 'Bearer ' + token)

  } 
  getAuthUser( email : string)  {
    return this.http.get('https://localhost:7167/Users/AuthUser/'+email);
  }
}
 
