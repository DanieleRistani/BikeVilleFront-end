import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from '../../Entity/Credentials';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class LoginService{

  constructor(private http :HttpClient) {
 
  }

  isAuth!:Boolean



 checkValidToken(token: string) {
  const exp=jwtDecode(token).exp||0;
  console.log(exp);
  console.log(Math.floor(Date.now() / 1000));

  if(exp < Math.floor(Date.now() / 1000)){
   return false
  }else{
    return true
  }
 }
 

  loginPost(credentials: Credentials): Observable<any> {
    return this.http.post('https://localhost:7167/LoginJwt/Login', credentials, {
      observe: 'response',
    });
  }

  runLogout(){
    localStorage.removeItem("token")
    localStorage.removeItem("cart")
    window.location.replace('/');
  }
  
  getAuthUser( email : string)  {
    return this.http.get('https://localhost:7167/Users/AuthUser/'+email);
  }
}
 
