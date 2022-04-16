import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ProductComponent } from './component/product/product.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ProductRoutingModule } from './component/product/product-routing/product-routing.module';
import { UserRoutingModule } from './component/users/user-routing/user-routing.module';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';


const routes: Routes = [
  {path: "", redirectTo: 'products', pathMatch:'full'},
  {path: 'products', loadChildren: () => import('./component/product/product-routing/product-routing.module').then(m=>m.ProductRoutingModule)},
  {path: 'users', loadChildren: () => import('./component/users/user-routing/user-routing.module').then(m=>m.UserRoutingModule)},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path:'**', component:NotFoundComponent},


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ProductRoutingModule,
    UserRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
