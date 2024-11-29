import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  public cartCount =  new BehaviorSubject<number>(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')||'').length : 0);

  addToCart(productId : number){
    if(localStorage.getItem('cart')){
      let cart = JSON.parse(localStorage.getItem('cart')!);
      if(cart == null){
        cart = [];
      }
      
      cart.push(productId);
      localStorage.setItem('cart', JSON.stringify(cart));
      
    }else{
      window.location.replace('/login');
    }
  }
}
