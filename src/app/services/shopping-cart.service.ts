import { Injectable, Output, EventEmitter } from '@angular/core';
import { add, total, list, exists, quantity, remove, update,  get, destroy } from 'cart-localstorage' 
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() { 
  }

  public create(product,qty = 1) {
    add({id: product.ProductId, 
        name: product.Name, 
        price: product.Price,
        image: product.ProductPicUrl,
        maxQty: product.Quantity
      }
        ,qty)
  }

  public getCart(){
    return list();
  }

  public getTotal(){
    return total()
  }
  
  public productExist(id){
    return exists(id)
  }

  public increaseQuantity(id,quantityInCart){
    quantity(id,1)
    return this.getCart()
  }

  public decreaseQuantity(id){ 
    quantity(id,-1)
    return this.getCart()
  }

  public removeProduct(id) {
    remove(id)
    return this.getCart()
  }

  public updateProduct(id,property,value){
    update(id,property,value)
  }
  
  public getSpecificProd(id){
    return get(id)

  }
  public destroyCart(){
    return  destroy()
  }
}
