import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {



  constructor(private http: HttpClient) { }

  private url:string= "http://localhost:3000/product";

  //get all product
  getProduct(){
    return this.http.get<any>(this.url)
    .pipe(map((res:any)=>{      
      return res;
    }))
  }


  getSingleProduct(id: any): Observable<Product> {
    return this.http.get(`${this.url}/${id}`);
  }

  //add product
  public addProduct(product: any){
    return this.http.post(this.url, product);
  }

  updateProduct(id: any, data: any): Observable<any> {
    console.log(data);
    return this.http.put(`${this.url}/${id}`, data);
  }
  

  public uploadFileSrv(file: any){
    //console.log(file);

    const data = new FormData()
    data.append('file', file)
    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY', '90d9e00e6b2a05d92ba7');
    return this.http.post('https://upload.uploadcare.com/base/', data , {
      reportProgress: true,
      observe: 'events'
    });
  }

  public deleteProduct(id: any): Observable<Product>{
    console.log('deleteuser')
    return this.http.delete(`${this.url}/${id}`);
  }


}


