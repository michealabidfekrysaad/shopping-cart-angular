import { Component, OnInit, DoCheck } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl:'./navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, DoCheck {
  cartItems: any;
  total;


  constructor(public shopService : ShoppingCartService) { }

  ngOnInit(): void {
  }

  ngDoCheck(){
    this.cartItems = this.shopService.getCart()
    this.total = this.shopService.getTotal()

  }
  removeProd(id){
    this.shopService.removeProduct(id)
    event.stopPropagation();
  }

}
