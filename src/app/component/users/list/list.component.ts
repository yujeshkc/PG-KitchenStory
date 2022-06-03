import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public userList: any;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(){
    this.userService.getUsers().subscribe(res => {
      //console.log(res);
      this.userList = res;
    })
  }

  deleteUser(id: any, name: String){   
    if(confirm("Are you sure to delete this User: "+name)) {
      this.userService.deleteUser(id).subscribe(data=> {       
        this.loadUser();
      })
    } 
        
  }

}
