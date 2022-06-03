import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
    
    


    constructor(private http: HttpClient) { }
    private url:string= "http://localhost:3000/user";

    //get all product
    getUsers(){
        return this.http.get<any>(this.url)
        .pipe(map((res:any)=>{
        console.log(res);
        return res;
        }));
    }

    //add product
    public addUser(product: any){
        return this.http.post(this.url, product);
    }

    //get single User
    getSingleUser(id: any): Observable<User> {
        return this.http.get(`${this.url}/${id}`);
    }

    //update Single User
    updateUser(id: any, data: any): Observable<any> {
        console.log(data);
        return this.http.put(`${this.url}/${id}`, data);
    }

    deleteUser(id: any){       
        return this.http.delete(`${this.url}/${id}`);
    }


    // removeCartItem(product: any){
    //     this.userList.map((a:any, index:any)=>{
    //       if(product.id=== a.id){
    //         this.userList.splice(index,1);
    //       }
    //     })
    //     this.userList.next(this.userList);
    //   }





}