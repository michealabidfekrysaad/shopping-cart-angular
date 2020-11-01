import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router} from '@angular/router';

import { ProductService } from '../services/product.service';
import { IItem } from '../iitem'
import { ShoppingCartService } from '../services/shopping-cart.service';

declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  @ViewChild('grid') div: ElementRef;
  @ViewChild('list') div2: ElementRef;
  @ViewChild('btnGrid') btn: ElementRef;
  @ViewChild('btnList') btn2: ElementRef;pagination
  @ViewChild('pagination') paginate: ElementRef;
  searchText:string;
  allInfo = [];
  products : IItem[] = [];
  startIndex = 0;
  endIndex = 12;
  productID;
  id: number;
  productExist: boolean = false
  myImgUrl = "assets/images/image-holder.jpeg"
  productIsNotExist: boolean = false;
  itemAdded;
  currentPage = 0;


  constructor(public productService: ProductService,
              private router : Router,
              private shopService : ShoppingCartService 
    ) {
      this.productService.getProducts()
      .subscribe((data : IItem[]) => {
        for(let d in data){
          if(data.hasOwnProperty){
            this.allInfo.push(data[d])
          }
        }
        this.products = this.allInfo[0].reverse();
      },(err) => {
        console.log(err);
        alert("you have a network error reload page !!")
      }); 
     }

  ngOnInit() {  
    
  }

  getArrayPagination(length) {
    return new Array(Math.floor(length/12));
  }

  updateIndex(pageIndex,$element){
    this.currentPage = pageIndex
    this.startIndex = pageIndex * 12;
    this.endIndex = this.startIndex + 12;
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  getNavigation(product, id){
    const specificProd = this.products.filter(prod => prod.ProductId == id);
    this.router.navigate(['/view',id]);
  }
  addToCart(prod){
    this.itemAdded = prod.ProductId;
    this.productExist = this.shopService.productExist(prod.ProductId);
    if(!this.productExist){
      this.shopService.create(prod);
      this.productIsNotExist = true;
    } 
    setTimeout(() => {
      this.productExist = false;
      this.productIsNotExist = false;
    }, 3000);   
  }

  onChangeGrid(){ 
    this.div.nativeElement.style.display="block"
    this.div2.nativeElement.style.display ="none" 
    this.btn.nativeElement.style.display ="none"
    this.btn2.nativeElement.style.display ="inline"
  }
  onChangeList(){
    this.div.nativeElement.style.display="none"
    this.div2.nativeElement.style.display ="block" 
    this.btn.nativeElement.style.display ="inline"
    this.btn2.nativeElement.style.display ="none"
  }

}
