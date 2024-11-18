import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http :HttpClient) { }

  register(data:any){
    return this.http.post('https://localhost:7167/Users/Add',data);
  }
}
