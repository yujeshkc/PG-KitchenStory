import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public productList: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadProductList();
  }

  loadProductList() {
    this.api.getProduct().subscribe(res => {
      //console.log(res);
      this.productList = res;
    })
  }

  deleteProduct(id: any){
    this.api.deleteProduct(id).subscribe(res => {
      console.log(res);
    })
    this.loadProductList();   
  }

}
