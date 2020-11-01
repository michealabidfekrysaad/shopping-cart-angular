import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, AbstractControl } from '@angular/forms'
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  userForm = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]), 
    phone : new FormControl('',[Validators.required,this.ValidatePhone]), 
    address : new FormControl('',[Validators.required,Validators.minLength(7)]),
  })
  email:string;
  phone:number;
  address:string;
  total: any;
  totalCart;
  insideSubmit : boolean;
 

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
  }
  ValidatePhone(control: AbstractControl): {[key: string]: any} | null  {
    if (control.value && control.value.toString().length == 10 ) {
      return null;
    }
    return { 'phoneNumberInvalid': true };
  }

  onSubmit(){
    this.insideSubmit = true
    this.email = this.userForm.controls['email'].value
    this.phone = this.userForm.controls['phone'].value
    this.address = this.userForm.controls['address'].value
    this.total = this.cartService.getTotal()

    this.cartService.destroyCart()

  }
  ngDoCheck(){
    this.totalCart = this.cartService.getCart()
    if(!this.insideSubmit) this.total = this.cartService.getTotal()

  }


  
}
