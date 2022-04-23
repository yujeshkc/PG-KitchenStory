import { Component, OnInit } from '@angular/core';
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
    this.api.getProduct().subscribe(res => {
      //console.log(res);
      this.productList = res;
    })
  }

}
