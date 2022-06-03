import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm : FormGroup;

  
  constructor(
    private formBuilder: FormBuilder,
    private loginService: AuthService,
    private router: Router,
    ) {

    this.loginForm =  this.formBuilder.group({
      username:['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      password:['',[Validators.required,Validators.minLength(8), Validators.maxLength(80)]],
      rememberMe:[false]
    });

  }

  ngOnInit(): void {
    if(this.loginService.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  onSubmit(loginForm: any){
    if(loginForm.valid) {
      this.loginService.login(this.loginForm.value)
      .subscribe(
        (data: any) => {
          console.log(data[0].token);
          localStorage.setItem('token', data[0].token);
          localStorage.setItem('user', data[1].username);
          localStorage.setItem('role', data[1].role);
          this.router.navigate(['/']);
        },
        error => {
          console.log("Server Error");
          console.log(error);
        }
      )
      console.log(this.loginForm.value);
    }  else {
      console.log("invalid form");
      this.validate(loginForm);
    }
  }

  validate(form:any){
    Object.keys(form.controls).forEach(field => {
      const control = form.controls[field];
      if(control instanceof FormControl){
          control.markAsTouched({onlySelf: true});
      } else {
          this.validate(control)
      }
    });
  }

  hasError(fieldName: any ){
    let field = this.loginForm.get(fieldName);
    return (field?.invalid && field?.touched && field?.errors)
  }

  get form(){
    return this.loginForm.controls;
  }

  get email(){
    return this.form['email'];
  }

  get password(){
    return this.form['password'];
  }


}
