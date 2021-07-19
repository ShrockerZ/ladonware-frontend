import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  constructor(
    private _productService:ProductService,
    private _route:Router) { }

  ngOnInit(): void {
  }
  searchProduct(searchterm:string,$event:Event){
    $event.preventDefault();
    this._productService.searchProduct({title:searchterm});
  }
  goToAddProduct(){
    this._route.navigate(['/home/create']);
  }

}
