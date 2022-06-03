import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

    public productItemList : any = [];
    public productList = new BehaviorSubject<any>([]);
    public orderItem : any = [];

    private url:string= "http://localhost:3000/order";


    constructor(private http: HttpClient){}

    confirmOrder(product: any, paymentMethod: string){ 
        return this.http.post(this.url, {'payment': paymentMethod, 'product': product});
    }

   
    

}