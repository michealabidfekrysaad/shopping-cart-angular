import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { IItem } from '../iitem';
import { ShoppingCartService} from '../services/shopping-cart.service'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild('inputQty') input: ElementRef;

  qty = '2';
  theError: string
  product;
  prodInCart;
  itemNo: any;
  allInfo =[]
  productExist: boolean;
  constructor(private route: ActivatedRoute,
              public productService: ProductService,
              public shopService: ShoppingCartService,
              private router: Router) { }

  ngOnInit(): void {
  this.itemNo = this.route.snapshot.params['productId'];
  this.productService.getProducts()
  .subscribe((data : IItem[]) => {    
    for(let d in data){
      if(data.hasOwnProperty){
        this.allInfo.push(data[d])
      }
    }
    this.product = this.allInfo[0].filter(prod => prod.ProductId == this.itemNo);;
    
  },(err) => {
    alert("you have network error reload the page !!")
    console.log(err);
  });
  
   }

   addToCart(prod,maxQty){
    this.productExist = this.shopService.productExist(prod.ProductId);
    let inputVal = parseInt(this.input.nativeElement.value);
    if(!this.productExist){
      if(inputVal <= maxQty){
        this.shopService.create(prod,inputVal);
        this.router.navigate(['cart']);
      }
      this.productExist = true;
      // this.theError = "you exceed number of product in stock"
    }else{
      this.prodInCart = this.shopService.getSpecificProd(prod.ProductId);
      if(!(inputVal >= 2 )) this.theError = "enter correct value";
      if(!(inputVal > this.prodInCart.quantity)) this.theError = "value entered less than quantity in your cart"
      if(!(inputVal <= prod.Quantity)) this.theError = "you exceed number of product in stock"
      if(this.input.nativeElement.value.length == 0) this.theError = "enter correct Qty except 0";
      if(inputVal >= 2 && 
          inputVal > this.prodInCart.quantity &&
          inputVal <= prod.Quantity ){
        this.shopService.updateProduct(
          prod.ProductId,'quantity',inputVal)
        this.router.navigate(['cart']);
      }
    }
    setTimeout(() => {
      this.productExist = false;
    }, 3000); 
       
  }


}
