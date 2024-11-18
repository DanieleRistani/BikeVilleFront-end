import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http :HttpClient) { }

  register(data:any){
    console.log(data);
    
    return this.http.post('https://localhost:7167/Users/Add',data);
  }

  formattaNumero(numero: string ): string {
    
    const numeroStr = numero.toString();

   
    if (numeroStr.length !== 10 || !/^\d{10}$/.test(numeroStr)) {
        return "Errore: il numero deve avere 10 cifre.";
    }
    const formato = `${numeroStr.slice(0, 3)}-${numeroStr.slice(3, 6)}-${numeroStr.slice(6)}`;
    return formato;
}
}
