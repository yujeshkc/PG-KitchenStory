import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public createUser: FormGroup;
  public userId!: String;

  constructor(
    private fromBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    
    this.createUser =  this.fromBuilder.group({
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email:['', [Validators.required, Validators.email, Validators.minLength(1), Validators.maxLength(80)]],
        username:['',[Validators.required, Validators.minLength(5)]],
        usergroup:['',[Validators.required]],
        password:['', [Validators.required, Validators.minLength(6)]],
        country:[''],
        city:[''],
        state:[''],
        streetAddress:[''],
        zipCode: [''],
        status:[''],     

    });

  }

  ngOnInit(): void {
  
  }

  public onSubmit(createUser: any){
    if(createUser.valid) {
      this.userService.addUser(this.createUser.value).subscribe(res=>{
        console.log(Object.values(res));        
        console.log("user created ");
        this.router.navigate(['users/update/'+Object.values(res)[12]]); 
      });
    } else {
      this.validate(createUser);
      console.log(this.createUser);
      console.log("invalid form");      
    }
  }

  validate(form:any) {
    Object.keys(form.controls).forEach(field => {
      const control = form.controls[field];
      if(control instanceof FormControl){
        control.markAsTouched({onlySelf: true});
      } else {
        this.validate(control);
      }
    });
  }

  hasError(fieldName: any){
    let field = this.createUser.get(fieldName);
    return (field?.invalid && field?.touched && field?.errors);
  }

  get form(){
    return this.createUser.controls;
  }

  get fullName(){
    return this.form['fullName'];
  }

  get email(){
    return this.form['email'];
  }

  get password(){
    return this.form['password'];
  }


  get username(){
    return this.form['username'];
  }

}
