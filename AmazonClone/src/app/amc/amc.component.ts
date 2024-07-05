import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Product, ProductService } from '../product.service';
import { User, UserService } from '../user.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-amc',
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule,CartComponent],
  templateUrl: './amc.component.html',
  styleUrl: './amc.component.css'
})
export class AmcComponent {
  products: Product[] = [];
  selectedProduct:Product = new Product(0,'','','',0,'','',0,0,'');
  user:User[]=[];
  first: boolean= true;
  second: boolean = false;
  third:boolean = false;
  mesg:string='';
  totalPrice : number=0;
  constructor(private router:Router,private productService:ProductService,private userService:UserService) {
    this.loadAllProducts();
  }

  profile(): void {
    this.first = false;
    this.second = true;
    this.third = false;
    this.userService.profile().subscribe(
      (res: any) => {
        if (res.length === 0) {
          this.first = false;
          this.second = true;
          this.third = false;
          alert('Please login'); 
          this.router.navigate(['/login']);      
        } else {
          this.user = res; 
          console.log(res); 
        }
      },
      (error) => {
        console.error('Error fetching profile:', error);
        alert('Please login'); 
          this.router.navigate(['/login']); 
      }
    );
  }

    loadAllProducts() {
      this.productService.allProduct().subscribe(
        (data: Product[]) => {
          this.products = data;
          this.first = true;
          this.second = false;
          this.third = false;
        }, error => {
          console.error('Error fetching products: ', error);
        }
      );
  }  

  addBuy(product: Product){
    this.selectedProduct = product;
    this.first = false;
    this.second = false;
    this.third = true;
  }
  
  buyProduct(product: Product): void {
    if (this.userService.checkSession()) {
      this.productService.buyProduct(product).subscribe(
        () => {
         alert('Product purchased successfully');
          this.router.navigate(['/my-order']);
        },
        error => {
          alert('Product not purchased ,Please try again later.');
          this.router.navigate(['/login']);
        }
      );
    } else {
      alert('Please try again later.');
      this.router.navigate(['/login']);
    }
  }
  calculateTotalPrice(): void {
      this.totalPrice = this.selectedProduct.quantity * this.selectedProduct.price;
      this.totalPrice = Math.max(this.totalPrice, 0); 
  }

  addCart(product: Product) {
    if (this.userService.checkSession()) {
      this.productService.addProductToCart(product).subscribe(
        () => {
          alert('Product added to cart');
          this.router.navigate(['/cart']);
        }, error => {
          console.error('Error adding product to cart: ', error);
          alert('Please login');
          this.router.navigate(['/login']);
        }
      );
    } else {
      alert('Please login');
      this.router.navigate(['/login']);
    }
  }  
  category(cate: string): void {
    this.productService.viewProductsByCategory(cate).subscribe(
      (products: Product[]) => {
        this.products = products;
        this.mesg = cate; 
        this.first = true;
        this.second = false;
        this.third = false;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
