import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  productForm:FormGroup;
  constructor(
    private _fb:FormBuilder
  ) {
    this.productForm=new FormGroup({});
    this.createForm();
   }
  ngOnInit(): void {
  }
  createProduct(){
    // filtro de categoria
    if(this.productForm.get('categoryS')?.value!=="") this.productForm.controls['category'].setValue(this.productForm.get('categoryS')?.value)
    if(this.productForm.valid){
      this.productForm.reset();
      this.createForm();
    }else{
      Object.values(this.productForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }
  }
  resetCategory(name:string){
    this.productForm.controls[name]?.setValue("");
  }
  createForm(){
    this.productForm= this._fb.group({
      title:['',[Validators.required,]],
      description:['',[Validators.required,]],
      category:['',[]],
      categoryS:['',[]],
      price:['',[Validators.required,]],
      quantity:['',[Validators.required,]],
      existence:['stock',[Validators.required,]],
      image:['',[Validators.required,]],
    });
    console.log(this.productForm.value);
  }
}
