import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm : FormGroup;

  
  constructor(private formBuilder: FormBuilder) {

    this.loginForm =  this.formBuilder.group({
      email:['', [Validators.required, Validators.minLength(4), Validators.maxLength(40), Validators.email]],
      password:['',[Validators.required,Validators.minLength(8), Validators.maxLength(80)]],
      rememberMe:[false]
    });

  }

  ngOnInit(): void {
  }

  public onSubmit(loginForm: any){
    if(loginForm.valid) {
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
