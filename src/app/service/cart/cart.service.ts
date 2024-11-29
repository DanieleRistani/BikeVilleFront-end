import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }


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
