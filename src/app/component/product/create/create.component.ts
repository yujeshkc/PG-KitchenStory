import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public createProduct: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private productService: ApiService ) { 
    this.createProduct = this.formBuilder.group({
      title:['', [Validators.required]],
      slug:['',[Validators.required, Validators.pattern('^[a-z0-9]+(?:-[a-z0-9]+)*$')]],
      price:[''],
      inStock:['',[Validators.required]],
      detail:[''],
      unit:[''],
      image:[''],
      category:['', [Validators.required]],
      seoTitle:[''],
      seoDetail:['']
    });
  }

  ngOnInit(): void {
    this.form['title'].valueChanges.subscribe((change)=>this.form["slug"].setValue(this.slugify(change)));
  }

  public onSubmit(createProduct: any){
    if(createProduct.valid) {
      console.log(this.createProduct.value);
      this.productService.addProduct(this.createProduct.value).subscribe(res=>{
        console.log(res);
        console.log("prodct created ");
      });
    }  else {
      this.validate(createProduct);
      console.log(this.createProduct);
      console.log("invalid form");      
    }
  }

  slugify(input: string): string {

    return input
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text  
    
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
    let field = this.createProduct.get(fieldName);
    return (field?.invalid && field?.touched && field?.errors)
  }

  scrollTo(element: any): void{
    (document.getElementById(element) as HTMLElement).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  titleToSlug(element: string): void {
    this.form['title'].value;
  }

  get form(){
    return this.createProduct.controls;
  }

  get title(){
    return this.form['title'];
  }

  get slug(){
    return this.form['slug'];
  }

}
