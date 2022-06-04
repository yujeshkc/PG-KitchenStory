import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public totalItem    : number = 0;
  public showDropdown : boolean = false;
  public searchTerm   : string = '';



  constructor(
    private cartService  : CartService,
    public  authService  : AuthService,
    private router       : Router
  ) {}

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    });
    
  }

  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public showDropdownAdmin(){
    if(this.showDropdown){
      this.showDropdown = false;
    } else{
      this.showDropdown = true;
    }
  }

  search(event: any){
    this.searchTerm = (event.target as HTMLInputElement).value;    
    this.cartService.search.next(this.searchTerm);
  }


  logout() {   
    this.authService.clear();
    this.router.navigate(['/']);
  }

}
