import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable, Subject} from 'rxjs';
import { ICategory, IProduct } from '../interfaces/product.interface';
@Injectable({
  providedIn: 'root'
})
export class ProductService  {
  API_URL:string;
  headers:HttpHeaders= new HttpHeaders();
  products:BehaviorSubject<Product[]>= new BehaviorSubject<Product[]>([]);
  selectedProduct:Subject<Product>= new Subject<Product>();
  categories:BehaviorSubject<ICategory[]>= new BehaviorSubject<ICategory[]>([]);

  constructor(
    private _http:HttpClient) { 
    this.API_URL=environment.API_URL;
    this.headers.append('Content-type','application/json');
    this.headers.append('Cache-Control','no-cache');
    this.headers.append('Pragma','no-cache');
  }
  async getCategories(){
    const url=`${environment.API_URL}/categories`;
    this.categories.next(await this._http.get<ICategory[]>(url,{headers:this.headers}).toPromise());
  }
  async getProducts(){
    const url=`${environment.API_URL}/products`;
    this.products.next(await this._http.get<Product[]>(url,{headers:this.headers}).toPromise());
  }
  getProduct(id:string){
    const url=`${environment.API_URL}/products/${id}`;
    return this._http.get<Product>(url,{headers:this.headers}).toPromise();
  }
  async searchProduct(data:{title?:string}){
    let url:string="";
    if(data.title) url=`${environment.API_URL}/products?title=${data.title}`;
    if(!data.title){
      this.getProducts();
      return
    }
    this.products.next(await this._http.get<Product[]>(url,{headers:this.headers}).toPromise());
  }
  async createProduct (product:FormData){
    const url=`${environment.API_URL}/products`
    await this._http.post<Product>(url,product,{headers:this.headers}).toPromise();
    this.getProducts();
  }
  async deleteProduct(id:string){
    const url=`${environment.API_URL}/products/${id}`
    await this._http.delete(url,{headers:this.headers}).toPromise();
    this.getProducts();
  }
  async updateProduct(id:string,product:FormData){
    const url=`${environment.API_URL}/products/${id}`
    await this._http.put(url,product,{headers:this.headers}).toPromise();
    this.getProducts();
  }
}
