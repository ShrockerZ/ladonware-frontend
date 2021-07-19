import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products:Product[]=[];
  imagePath:string="";
  constructor(private _productService:ProductService) { 
    this.imagePath=`${environment.API_URL}/products`;
  }
  ngOnInit(): void {  
    this._productService.products.subscribe(products=>{
      this.products=products;
    });
  }
  deleteProduct(productId:string=""){
    this._productService.deleteProduct(productId);
  }
  getText(texto:string){
    switch(texto){
      case 'stock':
        return 'En stock';
      case 'out-stock': 
        return 'Agotado'
      case 'limited': 
        return 'Limitado'
      default: return ""
    }
  }

}
