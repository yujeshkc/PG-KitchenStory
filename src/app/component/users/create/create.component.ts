import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public createUser: FormGroup;

  constructor(private fromBuilder: FormBuilder) {
    
    this.createUser =  this.fromBuilder.group({
        fullName:['', [Validators.required, Validators.minLength(3)]],
        email:['', [Validators.email, Validators.minLength(4), Validators.maxLength(80)]]
    });

  }

  ngOnInit(): void {
  }

  public onSubmit(createUser: any){

  }

}
