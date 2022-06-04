import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public productList  : any;
  public searchProduct : any;
  public filterCategory : any
  public searchKey    : string = "";

  constructor(
    private api: ApiService,
    private cartService : CartService
    ) { }

  ngOnInit(): void {
    this.api.getProduct()
    .subscribe(res => {
      this.productList = res;
      this.filterCategory = res;

      // this.productList.forEach((a: any) => {
      //   if
      // })  
       
    });

    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;    
      this.api.getProduct(this.searchKey).subscribe(res => {
        this.productList = res;
      });  
      console.log(this.searchKey);
    })

   

  }

  addtocart(item: any){
    this.cartService.addtoCart(item);
  }

  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }

}
