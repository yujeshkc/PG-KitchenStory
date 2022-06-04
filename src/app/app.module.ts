import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { ProductComponent } from './component/product/product.component';
import { CartComponent } from './component/cart/cart.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { FilterPipe } from './shared/filter.pipe';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ProductModule } from './component/product/product.module';
import { UsersComponent } from './component/users/users.component';

import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersModule } from './component/users/users.module';
import { AuthGuard } from './guard/auth.guard';
import { AuthInterceptor } from './guard/auth.interceptor';
import { UserService } from './service/user.service';
import { AccountComponent } from './component/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductComponent,    
    CartComponent,
    CheckoutComponent,
    FilterPipe,
    NotFoundComponent,
    UsersComponent,
    RegisterComponent,
    LoginComponent,
    AccountComponent,
    FilterPipe 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule,
    UsersModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true

    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
