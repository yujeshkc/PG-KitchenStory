import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { CheckoutService } from 'src/app/service/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public products : any = [];
  public paymentMethod : string = "";
  public allTotal !: number;
  public orderSuccess : boolean = false;


  public productList = new BehaviorSubject<any>([]);
  
  
  constructor(
    private cartService: CartService,
    private checkout: CheckoutService
  ) {}

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;  
      this.allTotal = this.cartService.getTotalPrice();    
    });
    
    
  } 


  
  // nsgOnInit(): void {
  //   this.cartService.getProducts()
  //   .subscribe(res=>{
  //     this.products = res;
  //     this.allTotal = this.cartService.getTotalPrice();
  //   })
  // }

  selectPayment(payment: string){
    this.paymentMethod = payment;
  }

  orderConfirm(){
    this.checkout.confirmOrder(this.products, this.paymentMethod).subscribe(res=>{
      this.cartService.removeAllCart();
    
      if(Object.values(res)[0] == 'true'){
        this.orderSuccess = true;   
        console.log(Object.values(res)[0]);     
      }
    });
  }


}
