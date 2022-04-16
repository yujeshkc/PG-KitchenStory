import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  

  constructor(private http: HttpClient) { }

  private url:string= "http://localhost:3011/products";

  //get all product
  getProduct(){
    return this.http.get<any>(this.url)
    .pipe(map((res:any)=>{
      return res;
    }))
  }


  //add product
  public addProduct(product: any){
    return this.http.post(this.url,product);
  }
  


}
