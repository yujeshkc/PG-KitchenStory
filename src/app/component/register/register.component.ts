import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm : FormGroup ;
  successMessage = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private registerService: AuthService,
    private router: Router
    ) { 
    this.registerForm =  this.formBuilder.group({
      username:['',[Validators.required,Validators.minLength(8), Validators.maxLength(80)]],
      email:['', [Validators.required, Validators.minLength(4), Validators.maxLength(40), Validators.email]],
      password:['',[Validators.required,Validators.minLength(8), Validators.maxLength(80)]],
      confirmPassword:['',this.conformPasswordValidator],
      agreeTerms:['',[Validators.required]]
    });

    this.form['password'].valueChanges.subscribe(
      x => this.form['confirmPassword'].updateValueAndValidity()
    );

  }

  ngOnInit(): void {
    if(this.registerService.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  public onSubmit(registerForm: any){
    if(registerForm.valid) {
      console.log(this.registerForm.value);
      this.registerService.submitRegister(this.registerForm.value).subscribe(
        data => this.successMessage = "Registration Successfull",
        error => this.successMessage = "Register Not Compleate"
      );
    }  else {
      console.log("invalid form");
      this.validate(registerForm);
    }
  }

  conformPasswordValidator(control: AbstractControl){
    if(control && (control.value !== null || control.value !== undefined)){
      
      const confirmPasswordValue = control.value;
      const passwordValue = control.root.get('password');
      console.log(confirmPasswordValue);
      console.log(passwordValue);
      if(passwordValue){
        const passValue = passwordValue.value;
        if(passValue !== confirmPasswordValue || passValue === '' ){
          return {
            isError: true
          }
        }
      }
    }    
    return null;
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
    let field = this.registerForm.get(fieldName);
    return (field?.invalid && field?.touched && field?.errors)
  }

  get form(){
    return this.registerForm.controls;
  }

  get email(){
    return this.form['email'];
  }

  get username(){
    return this.form['username'];
  }

  get password(){
    return this.form['password'];
  }

}
