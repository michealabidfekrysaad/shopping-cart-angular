import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service'


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  @ViewChild('qty') div: ElementRef;
  cartItems;
  total: any;
  constructor(public shopService : ShoppingCartService) {  

   }

  ngOnInit(): void {
    // hena baragae el card kamla mn el service
    this.cartItems = this.shopService.getCart()
    this.total = this.shopService.getTotal();
  }
  ngDoCheck(){
    this.cartItems = this.shopService.getCart()
    this.total = this.shopService.getTotal()

  }
  increaseQty(id,maxQty){
    let prod = this.shopService.getSpecificProd(id);
    if(prod.quantity < maxQty){
      this.cartItems = this.shopService.increaseQuantity(id,maxQty)
      this.total = this.shopService.getTotal()
    }
    }
  decreaseQty(id:number){
    if(parseInt(this.div.nativeElement.innerHTML) == 1){
      return null;
    }
    this.cartItems = this.shopService.decreaseQuantity(id)
    this.total = this.shopService.getTotal()
    
  }
  removeProd(id){
    this.cartItems = this.shopService.removeProduct(id)
    this.total = this.shopService.getTotal()
    
  }
  deleteAll(){
    this.shopService.destroyCart()
  }

}
