import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http:HttpClient) { }

  buyProduct (product:Product):Observable<Product>{
    return this.http.post<Product>(`http://localhost:8080/api/product/buyProduct `,product);
  }
  addProductToCart(product:Product):Observable<Product>{
    return this.http.post<Product>(`http://localhost:8080/api/product/addToCart`,product); 
  }

  viewProductsByCategory(category:string):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/api/product/viewProductsByCategory/${category}`); 
  }
  viewOrders():Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/api/product/viewOrder`); 
  }
  viewProductCart():Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/api/product/viewCart`); 
  }
  viewProductCartById(id:number):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/api/product/viewProductCartById/${id}`);
  } 
  allProduct():Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/product/allProduct`);
  }  
  delBuyProductById(id:number):Observable<any>{
    return this.http.delete<any>(`http://localhost:8080/api/product/delBuyProductsById/${id}`);
  } 
  delCartProductById(id:number):Observable<any>{
    return this.http.delete<any>(`http://localhost:8080/api/product/delCartProductsById/${id}`);
  } 

}

export class Product{
  productid: number;
  email: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  address: string;
  contact: number;
  quantity: number;
  image: string;
constructor(productid: number, email: string, name: string, brand: string, price: number, category: string, address: string, contact: number, quantity: number, image: string) { 
  this.productid = productid;
  this.email = email;
  this.name = name;
  this.brand = brand;
  this.price = price;
  this.category = category;
  this.address = address;
  this.contact = contact;
  this.quantity = quantity;
  this.image = image;
}
}
