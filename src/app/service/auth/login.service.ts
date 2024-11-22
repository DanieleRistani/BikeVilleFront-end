import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from '../../Entity/Credentials';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  constructor(private http :HttpClient) { }
 
 

  headersAuth = new HttpHeaders({
    'Content-Type': 'application/json',
    responseType: 'text',
  });


 
 

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
 
