import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { ApiService } from 'src/app/service/api.service';
//import { URL } from "url";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent  implements OnInit {


  public createProduct: FormGroup;
  public selectedFile!: String;
  public uploadedImage: any;
  public productId!: String;
  public firstImage!: String;

  singleProdut: Product = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private productService: ApiService 
  ) {

  this.createProduct = this.formBuilder.group({
      title:['', [Validators.required]],
      slug:['',[Validators.required, Validators.pattern('^[a-z0-9]+(?:-[a-z0-9]+)*$')]],      
      price:['', [Validators.required]],
      comparePrice:[''],      
      inStock:['1',[Validators.required]],
      detail:[''],
      costPeritem:[''],      
      unit:[''],
      image:[''],
      category:['', [Validators.required]],
      tag:['', [Validators.required]],
      status:[''],
      seoTitle:[''],
      seoDescription:['']
    });
    
  }


  ngOnInit(): void {
    this.getSingleProduct(this.route.snapshot.params['id']);    
    

  }

  getSingleProduct(id: string):  void {
    this.productService.getSingleProduct(id).subscribe(
      data => {
        let getProduct = Object.values(data)[1];       
        this.createProduct.setValue({
          title: getProduct.title,
          slug: getProduct.slug,
          price: getProduct.defultPrice ?? "",
          comparePrice: getProduct.comparePrice ?? "",
          inStock: getProduct.inStock? '1':'0',
          detail: getProduct.detail ?? "",
          costPeritem:getProduct.costPeritem ?? "",      
          unit:getProduct.unit ?? "",
          image: getProduct.image ?? "",
          category:getProduct.Category ?? "",
          tag:getProduct.Tag ?? "",
          status: getProduct.status? '1':'0',
          seoTitle:getProduct.seoTitle ?? "",
          seoDescription:getProduct.seoDescription ?? ""
        });
        this.firstImage = this.createProduct.value.image;      
        
      }
    )
  }



  public onSubmit(createProduct: any){
    if(createProduct.valid) {      
      this.productService.updateProduct(this.route.snapshot.params['id'], this.createProduct.value).subscribe(res=>{    
         document.getElementById("respo")?.classList.remove("hidden");      
         setTimeout(function(){
          document.getElementById("respo")?.classList.add("hidden")
         
         }, 2000  );
        // if(res.type === HttpEventType.UploadProgress){
        //   alert("updating");
        // } else if(res.type === HttpEventType.Response) {
         
        // }
        
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
     
     console.log(res);
      if(res.type === HttpEventType.UploadProgress){
        console.log(res.loaded + " / " + res.total);
        document.getElementById("imagePUp")?.classList.remove("hidden");
      } else if(res.type === HttpEventType.Response) {
        console.log("Uploaded" + res);
        console.log( res.body );
        this.uploadedImage = <any>res.body;
        this.form['image'].setValue(this.imageDispaly());
        document.getElementById("imagePUp")?.classList.add("hidden");
      }      
    });;
  }


  public imageDispaly(){ 
    this.firstImage = '';       
    return "https://ucarecdn.com/" + Object.values(this.uploadedImage)[0] +"/-/preview/400x400/";
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
