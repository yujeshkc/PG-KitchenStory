import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  public createUser: FormGroup;
  public userId!: String;

  singleUser: User = {};

  constructor(
    private fromBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    
    this.createUser =  this.fromBuilder.group({
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email:['', [Validators.required, Validators.email, Validators.minLength(1), Validators.maxLength(80)]],
        username:['',[Validators.required, Validators.minLength(5)]],
        password:['', [Validators.required, Validators.minLength(6)]],
        country:[''],
        city:[''],
        streetAddress: [''],
        state:[''],        
        zipCode: [''],
        status:[''],      

    });

  }

  ngOnInit(): void {
    this.getSingleUser(this.route.snapshot.params['id']);   
    console.log(this.route.snapshot.params['id']); 
  }

  getSingleUser(id: string):  void {
    this.userService.getSingleUser(id).subscribe(
      
      data => {
        let getUser = Object.values(data)[1]; 
        console.log(getUser);      
        this.createUser.setValue({
          username: getUser.username,
          email: getUser.email,
          fullName: getUser.fullName ?? "",
          password: getUser.password,
          country: getUser.country ?? "",
          streetAddress: getUser.streetAddress ?? "",
          city: getUser.city ?? "" ,
          status: getUser.status ?? "" ,
          state: getUser.state ?? "" ,
          zipCode: getUser.zipCode ?? ""       
        });       
      }
    )
  }

  public onSubmit(createUser: any){
    if(createUser.valid) {
      this.userService.updateUser(this.route.snapshot.params['id'], this.createUser.value).subscribe(res=>{
        document.getElementById("respo")?.classList.remove("hidden");      
        setTimeout(function(){
        document.getElementById("respo")?.classList.add("hidden")        
        }, 2000  );
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
