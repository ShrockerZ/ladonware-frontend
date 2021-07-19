import {Existences, ICategory, IProduct} from '../interfaces/product.interface'
export class Product implements IProduct{
    _id?:string;
    title:string="";
    description:string=";"
    category:ICategory={title:""}
    quantity:number=0;
    price:number=0;
    existences:Existences='stock'
    image:string="";

    public getTitle()           {return this.title}
    public getDescripton()      {return this.description}
    public getCategory()        {return this.category.title}
    public getQuantity()        {return this.quantity}
    public getPrice()           {return this.price}
    public getExistence()       {return this.existences}
    public getImg()             {return this.image}
}