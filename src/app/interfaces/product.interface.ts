export interface IProduct{
    _id?:string,
    title:string,
    description:string,
    category:ICategory|string,
    quantity:number,
    price:number,
    existences:Existences,
    image:string
}
export interface ICategory{
    _id?:string,
    title:string;
}
export type Existences= 'stock'|'out-stock'|'limited'