import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory, IProduct } from 'src/app/interfaces/product.interface';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  idString:string="";
  productForm:FormGroup;
  editing:boolean=false;
  selectedproduct:Product;
  uploadFile:File|null=null;
  categories:ICategory[]=[];

  constructor(
    private _fb:FormBuilder,
    private _productService:ProductService,
    private _router:Router,
    private _activateRoute:ActivatedRoute,
  ) {
    this.productForm=new FormGroup({}); 
    this.selectedproduct= new Product();  
    this.instanceForm();
   }
  async ngOnInit(){
    await this._activateRoute.params.subscribe(async param=>{
      // si esixte parametro de ientrada 
      this.idString=param['id'];
      (param['id'])?this.editing=true:this.editing=false; 
      if(param['id']){
        this.selectedproduct=(await this._productService.getProduct(param['id'])); 
        this.productForm.reset({
          title:this.selectedproduct.title,
          description:this.selectedproduct.description,
          categoryS:this.selectedproduct.category.title,
          price:this.selectedproduct.price,
          quantity:this.selectedproduct.quantity,
          existences:this.selectedproduct.existences,
          image:''
        });
      }
    }); 
    this._productService.getCategories();
    this._productService.categories.subscribe(result=>this.categories=result);
    
  }
  createProduct(){
    // filtro de categoria
    if(this.productForm.get('categoryS')?.value!=="") this.productForm.controls['category'].setValue(this.productForm.get('categoryS')?.value)
    if(this.productForm.valid){
      this.productForm.removeControl('categoryS');
      const product= new FormData();
      product.append('title',this.productForm.get('title')?.value)
      product.append('description',this.productForm.get('description')?.value)
      product.append('category',this.productForm.get('category')?.value)
      product.append('price',this.productForm.get('price')?.value)
      product.append('quantity',this.productForm.get('quantity')?.value)
      product.append('existences',this.productForm.get('existences')?.value)
      product.append('image',<File>this.uploadFile);

      (!this.editing)
        ?this._productService.createProduct(product)
        :this._productService.updateProduct(<string>this.selectedproduct._id,product);
        
      this.productForm.reset();
      this.instanceForm();
      this._router.navigate(['/home']);
    }else{
      Object.values(this.productForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }
  }
  resetCategory(name:string){
    this.productForm.controls[name]?.setValue("");
  }
  instanceForm(){
    this.productForm= this._fb.group({
      title:['',[Validators.required,]],
      description:['',[Validators.required,]],
      category:['',[]],
      categoryS:['',[]],
      price:['',[Validators.required,]],
      quantity:['',[Validators.required,]],
      existences:['stock',[Validators.required,]],
      image:['',[Validators.required,]],
    });
  }

  changeFile($event:Event){
    const target:HTMLInputElement=$event.currentTarget as HTMLInputElement;
    this.uploadFile=target.files?.item(0) as File;
  }
}
