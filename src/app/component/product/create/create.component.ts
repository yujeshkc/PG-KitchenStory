import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public createProduct: FormGroup;
  public selectedFile!: String;
  public uploadedImage: any;
  public productId!: String;
  


  
  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private productService: ApiService 
    ) { 

  

    this.createProduct = this.formBuilder.group({
      title:['', [Validators.required]],
      slug:['',[Validators.required, Validators.pattern('^[a-z0-9]+(?:-[a-z0-9]+)*$')]],      
      price:['', [Validators.required]],
      comparePrice:[''],      inStock:['1',[Validators.required]],
      detail:[''],
      costPeritem:[''],      
      unit:[''],
      image:[''],
      category:['', [Validators.required]],
      tag:['', [Validators.required]],
      status:[''],
      seoTitle:[''],
      seoDetail:['']
    });
  }

  ngOnInit(): void {
    this.form['title'].valueChanges.subscribe((change)=>this.form["slug"].setValue(this.slugify(change)));
  }

  public onSubmit(createProduct: any){
    if(createProduct.valid) {
     // console.log(this.createProduct.value);
      this.productService.addProduct(this.createProduct.value).subscribe(res=>{
        console.log(Object.values(res)[14]);        
        console.log("prodct created ");
        this.router.navigate(['/update/'+Object.values(res)[14]]);
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

  public upLoadFiletoSvr(event:any) {
    this.selectedFile = event.target.files[0];
    this.productService.uploadFileSrv(this.selectedFile).subscribe(res=>{      
      if(res.type === HttpEventType.UploadProgress){
        console.log(res.loaded + " / " + res.total)
      } else if(res.type === HttpEventType.Response) {
        console.log("Uploaded" + res);
        console.log( res.body);
        this.uploadedImage = <any>res.body;
        this.form['image'].setValue(this.imageDispaly());
      }      
    });;
  }


  public imageDispaly(){    
    return "https://ucarecdn.com/"+Object.values(this.uploadedImage)[0] +"/";    
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

  get price(){
    return this.form['price'];
  }

  get slug(){
    return this.form['slug'];
  }

}
